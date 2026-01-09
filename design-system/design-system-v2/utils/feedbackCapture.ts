// =============================================================================
// Feedback Capture Utilities
// Captures context, text content, and screenshots when user clicks
// =============================================================================

import type { CapturedContext, FeedbackPosition, TextContext, PageId } from '../data/feedbackTypes';

// Number of lines to capture before/after click point
const LINES_BEFORE = 50;
const LINES_AFTER = 50;

/**
 * Get readable path from clicked element up to body
 * Returns something like "Dashboard > Epic Cards > Epic 01"
 */
export function getElementPath(element: HTMLElement): string {
  const path: string[] = [];
  let current: HTMLElement | null = element;

  while (current && current !== document.body) {
    // Check for data attributes that indicate section/component names
    const sectionName = current.getAttribute('data-section');
    const componentName = current.getAttribute('data-component');
    const testId = current.getAttribute('data-testid');

    // Check for meaningful content
    if (sectionName) {
      path.unshift(sectionName);
    } else if (componentName) {
      path.unshift(componentName);
    } else if (testId) {
      path.unshift(testId.replace(/-/g, ' '));
    } else if (current.id) {
      path.unshift(current.id.replace(/-/g, ' '));
    } else {
      // Check for heading text inside this element
      const heading = current.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading && heading.textContent && !path.includes(heading.textContent.trim())) {
        const text = heading.textContent.trim().slice(0, 30);
        if (text) path.unshift(text);
      }
    }

    current = current.parentElement;
  }

  // Limit path length and clean up
  const uniquePath = [...new Set(path)].slice(0, 5);
  return uniquePath.length > 0 ? uniquePath.join(' > ') : 'Page';
}

/**
 * Find the nearest React component name
 * Looks for data-component or class names that look like components
 */
export function getComponentName(element: HTMLElement): string | undefined {
  let current: HTMLElement | null = element;

  while (current && current !== document.body) {
    // Check for explicit component name
    const componentName = current.getAttribute('data-component');
    if (componentName) return componentName;

    // Check class names for component-like patterns (PascalCase)
    const classes = Array.from(current.classList);
    const componentClass = classes.find(c => /^[A-Z][a-zA-Z]+$/.test(c));
    if (componentClass) return componentClass;

    current = current.parentElement;
  }

  return undefined;
}

/**
 * Extract text content around the clicked element
 * Simple: just get the element's text and basic info
 */
export function getTextContext(element: HTMLElement, clickY: number): TextContext {
  // Get the clicked element's text
  const clickedText = element.innerText?.slice(0, 500) || element.textContent?.slice(0, 500) || '';

  // Get parent context for before/after
  const parent = element.parentElement;
  const grandparent = parent?.parentElement;

  // Simple approach: get text from surrounding elements
  let textBefore = '';
  let textAfter = '';

  if (parent) {
    const siblings = Array.from(parent.children);
    const index = siblings.indexOf(element);

    // Get previous siblings text
    for (let i = Math.max(0, index - 3); i < index; i++) {
      const text = (siblings[i] as HTMLElement)?.innerText?.trim();
      if (text) textBefore += text + '\n';
    }

    // Get next siblings text
    for (let i = index + 1; i < Math.min(siblings.length, index + 4); i++) {
      const text = (siblings[i] as HTMLElement)?.innerText?.trim();
      if (text) textAfter += text + '\n';
    }
  }

  // Get element details
  const dataAttributes: Record<string, string> = {};
  Array.from(element.attributes)
    .filter(attr => attr.name.startsWith('data-'))
    .forEach(attr => {
      dataAttributes[attr.name] = attr.value;
    });

  return {
    textBefore: textBefore.trim(),
    textAfter: textAfter.trim(),
    clickedText: clickedText.trim(),
    elementTag: element.tagName.toLowerCase(),
    elementId: element.id || undefined,
    elementClasses: Array.from(element.classList),
    dataAttributes,
  };
}

/**
 * Calculate position as percentages for marker placement
 */
export function getPosition(event: MouseEvent): FeedbackPosition {
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const docWidth = Math.max(
    document.body.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.scrollWidth,
    document.documentElement.offsetWidth
  );

  return {
    x: (event.pageX / docWidth) * 100,
    y: (event.pageY / docHeight) * 100,
    scrollY: window.scrollY,
    viewportY: (event.clientY / window.innerHeight) * 100,
  };
}

/**
 * Determine current page ID based on URL or active section
 */
export function getCurrentPageId(): PageId {
  // Check for data-page attribute on main content
  const mainContent = document.querySelector('[data-page]');
  if (mainContent) {
    return mainContent.getAttribute('data-page') as PageId;
  }

  // Check for active nav item
  const activeNav = document.querySelector('[data-nav-active="true"]');
  if (activeNav) {
    const navId = activeNav.getAttribute('data-nav-id');
    if (navId) return navId as PageId;
  }

  // Default based on URL hash or path
  const hash = window.location.hash.replace('#', '');
  if (hash === 'tracker') return 'tracker';
  if (hash === 'showcase') return 'showcase';
  if (hash === 'feedback') return 'feedback';

  return 'dashboard';
}

/**
 * Capture screenshot of clicked element using html2canvas
 */
export async function captureScreenshot(
  element: HTMLElement,
  clickEvent?: { clientX: number; clientY: number }
): Promise<string | undefined> {
  try {
    const html2canvas = (await import('html2canvas')).default;

    // Find a reasonable container
    let target = element;
    while (target.parentElement && target.offsetWidth < 100 && target.offsetHeight < 100) {
      target = target.parentElement;
    }

    const canvas = await html2canvas(target, {
      backgroundColor: '#0D0D0D',
      scale: 1,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    return canvas.toDataURL('image/png', 0.8);
  } catch (error) {
    console.warn('Screenshot capture failed:', error);
    return undefined;
  }
}

/**
 * Main capture function - captures everything when user clicks
 * @param event - The mouse event from the click
 * @param includeScreenshot - Whether to capture a screenshot
 * @param targetElement - Optional: the actual element clicked (use when clicking through an overlay)
 */
export async function captureContext(
  event: MouseEvent,
  includeScreenshot: boolean = true,
  targetElement?: HTMLElement
): Promise<CapturedContext> {
  // Use provided element or fall back to event target
  const element = targetElement || event.target as HTMLElement;

  const position = getPosition(event);
  const sectionPath = getElementPath(element);
  const componentName = getComponentName(element);
  const pageId = getCurrentPageId();
  const textContext = getTextContext(element, event.clientY);

  let screenshot: string | undefined;
  if (includeScreenshot) {
    screenshot = await captureScreenshot(element, {
      clientX: event.clientX,
      clientY: event.clientY
    });
  }

  return {
    sectionPath,
    componentName,
    pageId,
    position,
    textContext,
    screenshot,
  };
}

/**
 * Format text context for display in the feedback form
 */
export function formatTextContextPreview(textContext: TextContext): string {
  const parts: string[] = [];

  if (textContext.clickedText) {
    parts.push(`Clicked on: "${textContext.clickedText.slice(0, 100)}${textContext.clickedText.length > 100 ? '...' : ''}"`);
  }

  parts.push(`Element: <${textContext.elementTag}>`);

  if (textContext.elementId) {
    parts.push(`ID: #${textContext.elementId}`);
  }

  if (textContext.elementClasses.length > 0) {
    parts.push(`Classes: ${textContext.elementClasses.slice(0, 3).join(', ')}`);
  }

  return parts.join(' | ');
}

/**
 * Find the primary element for a selection region
 */
function findPrimaryElement(
  bounds: { left: number; top: number; width: number; height: number }
): HTMLElement | null {
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;

  let element = document.elementFromPoint(centerX, centerY) as HTMLElement;

  if (!element || element.id === 'feedback-mode-overlay') {
    // Try corners
    const points = [
      { x: bounds.left + 10, y: bounds.top + 10 },
      { x: bounds.left + bounds.width - 10, y: bounds.top + 10 },
      { x: bounds.left + 10, y: bounds.top + bounds.height - 10 },
      { x: bounds.left + bounds.width - 10, y: bounds.top + bounds.height - 10 },
    ];

    for (const point of points) {
      const el = document.elementFromPoint(point.x, point.y) as HTMLElement;
      if (el && el.id !== 'feedback-mode-overlay' && !el.closest('[data-feedback-ui]')) {
        element = el;
        break;
      }
    }
  }

  return element;
}

/**
 * Get all major elements within a selection bounds and capture their full content
 * Plus 50 lines before/after for context
 */
function getTextFromSelection(
  bounds: { left: number; top: number; width: number; height: number }
): { elements: HTMLElement[]; combinedText: string; textBefore: string; textAfter: string } {
  const elements: HTMLElement[] = [];
  const capturedElements = new Set<HTMLElement>();

  // Find all elements that OVERLAP with selection (not just center)
  const allElements = document.querySelectorAll('div, section, article, p, h1, h2, h3, h4, h5, h6, li, span, pre, code, blockquote, td, th');

  allElements.forEach((el) => {
    const htmlEl = el as HTMLElement;

    // Skip feedback UI elements and empty elements
    if (htmlEl.closest('[data-feedback-ui]')) return;
    if (htmlEl.id === 'feedback-mode-overlay') return;
    if (!htmlEl.innerText?.trim()) return;

    const rect = htmlEl.getBoundingClientRect();

    // Check if element overlaps with selection at all
    const overlaps =
      rect.left < bounds.left + bounds.width &&
      rect.right > bounds.left &&
      rect.top < bounds.top + bounds.height &&
      rect.bottom > bounds.top;

    if (overlaps && !capturedElements.has(htmlEl)) {
      // Check if this is a "leaf" element (has mostly text, not many child elements with text)
      const childTextElements = htmlEl.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, pre, code');
      const isLeafLike = childTextElements.length < 3;

      if (isLeafLike) {
        capturedElements.add(htmlEl);
        elements.push(htmlEl);
      }
    }
  });

  // If we captured too few elements, try to get parent containers
  if (elements.length < 2) {
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const centerEl = document.elementFromPoint(centerX, centerY) as HTMLElement;

    if (centerEl && centerEl.id !== 'feedback-mode-overlay') {
      // Walk up to find meaningful containers
      let current: HTMLElement | null = centerEl;
      while (current && current !== document.body && elements.length < 3) {
        const rect = current.getBoundingClientRect();
        const text = current.innerText?.trim();

        // Add if it has substantial content and overlaps selection
        if (text && text.length > 20 && !capturedElements.has(current)) {
          const overlaps =
            rect.left < bounds.left + bounds.width &&
            rect.right > bounds.left &&
            rect.top < bounds.top + bounds.height &&
            rect.bottom > bounds.top;

          if (overlaps) {
            capturedElements.add(current);
            elements.push(current);
          }
        }
        current = current.parentElement;
      }
    }
  }

  // Build combined text from captured elements
  const textParts: string[] = [];
  elements.forEach((el) => {
    const fullText = el.innerText?.trim();
    if (fullText && fullText.length > 10) {
      textParts.push(fullText);
    }
  });

  // Deduplicate - remove text that's contained in another
  const uniqueTexts = textParts.filter((text, index) => {
    return !textParts.some((other, otherIndex) =>
      otherIndex !== index && other.length > text.length && other.includes(text)
    );
  });

  const selectedText = uniqueTexts.join('\n\n---\n\n');

  // Now get 50 lines before and after from the page
  const pageText = document.body.innerText || '';

  let textBefore = '';
  let textAfter = '';

  // Find where our selected text starts in the page
  const firstChunk = uniqueTexts[0]?.slice(0, 50) || selectedText.slice(0, 50);
  if (firstChunk) {
    const startIndex = pageText.indexOf(firstChunk);
    if (startIndex !== -1) {
      // Count lines before this point
      const textBeforeSelection = pageText.slice(0, startIndex);
      const linesBefore = textBeforeSelection.split('\n').filter(line => line.trim());
      const last50LinesBefore = linesBefore.slice(-50);
      textBefore = last50LinesBefore.join('\n');
    }
  }

  // Find where our selected text ends
  const lastChunk = uniqueTexts[uniqueTexts.length - 1]?.slice(-50) || selectedText.slice(-50);
  if (lastChunk) {
    const endIndex = pageText.lastIndexOf(lastChunk);
    if (endIndex !== -1) {
      const textAfterSelection = pageText.slice(endIndex + lastChunk.length);
      const linesAfter = textAfterSelection.split('\n').filter(line => line.trim());
      const first50LinesAfter = linesAfter.slice(0, 50);
      textAfter = first50LinesAfter.join('\n');
    }
  }

  return { elements, combinedText: selectedText, textBefore, textAfter };
}

/**
 * Capture context from a single element (hover-click approach)
 * Captures the element's full content + 50 lines before/after
 */
export async function captureContextFromElement(
  element: HTMLElement,
  event: MouseEvent
): Promise<CapturedContext | null> {
  try {
    const sectionPath = getElementPath(element);
    const componentName = getComponentName(element);
    const pageId = getCurrentPageId();

    // Get the element's full text content
    const elementText = element.innerText?.trim() || '';

    // Get 50 lines before and after from the page
    const pageText = document.body.innerText || '';

    let textBefore = '';
    let textAfter = '';

    // Find where this element's text appears in the page
    const searchText = elementText.slice(0, 100);
    if (searchText) {
      const startIndex = pageText.indexOf(searchText);
      if (startIndex !== -1) {
        // Get 50 lines before
        const textBeforeElement = pageText.slice(0, startIndex);
        const linesBefore = textBeforeElement.split('\n').filter(line => line.trim());
        textBefore = linesBefore.slice(-50).join('\n');

        // Get 50 lines after
        const endIndex = startIndex + elementText.length;
        const textAfterElement = pageText.slice(endIndex);
        const linesAfter = textAfterElement.split('\n').filter(line => line.trim());
        textAfter = linesAfter.slice(0, 50).join('\n');
      }
    }

    // Build text context
    const textContext: TextContext = {
      textBefore,
      textAfter,
      clickedText: elementText,
      elementTag: element.tagName.toLowerCase(),
      elementId: element.id || undefined,
      elementClasses: Array.from(element.classList),
      dataAttributes: {},
    };

    // Get data attributes
    Array.from(element.attributes)
      .filter((attr) => attr.name.startsWith('data-'))
      .forEach((attr) => {
        textContext.dataAttributes[attr.name] = attr.value;
      });

    // Calculate position
    const position = getPosition(event);

    return {
      sectionPath,
      componentName,
      pageId,
      position,
      textContext,
      screenshot: undefined,
    };
  } catch (error) {
    console.error('Element capture failed:', error);
    return null;
  }
}

/**
 * Capture context from a selection box area
 * Captures the full content of elements within the selection + 50 lines before/after
 */
export async function captureContextFromSelection(
  bounds: { left: number; top: number; width: number; height: number },
  event: MouseEvent
): Promise<CapturedContext | null> {
  try {
    // Find the primary element
    const element = findPrimaryElement(bounds);
    if (!element) {
      console.warn('No element found in selection');
      return null;
    }

    const sectionPath = getElementPath(element);
    const componentName = getComponentName(element);
    const pageId = getCurrentPageId();

    // Get full content from all elements in selection + 50 lines before/after
    const { combinedText, textBefore, textAfter } = getTextFromSelection(bounds);

    // Build text context with full element content and surrounding lines
    const textContext: TextContext = {
      textBefore,  // 50 lines before selection
      textAfter,   // 50 lines after selection
      clickedText: combinedText, // Full content of selected elements
      elementTag: element.tagName.toLowerCase(),
      elementId: element.id || undefined,
      elementClasses: Array.from(element.classList),
      dataAttributes: {},
    };

    // Get data attributes from primary element
    Array.from(element.attributes)
      .filter((attr) => attr.name.startsWith('data-'))
      .forEach((attr) => {
        textContext.dataAttributes[attr.name] = attr.value;
      });

    // Calculate position
    const position = getPosition(event);

    return {
      sectionPath,
      componentName,
      pageId,
      position,
      textContext,
      screenshot: undefined, // No screenshot - using text context instead
    };
  } catch (error) {
    console.error('Selection capture failed:', error);
    return null;
  }
}
