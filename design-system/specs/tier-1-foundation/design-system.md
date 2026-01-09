# VIBEUP Design System

> **Status**: 🚧 In Progress | **Last Updated**: [Date] | **Owner**: [Name]

This document defines the visual language, interaction patterns, and component library for VIBEUP. All features must follow these design principles.

## 🎨 Brand Identity

### Mission
[Your mission statement - why VIBEUP exists]

### Brand Personality
- **Trait 1**: [Description]
- **Trait 2**: [Description]
- **Trait 3**: [Description]

### Voice & Tone
Following `@rules/user-facing-language` from ai-coding-config:
- **Voice**: [How we always sound]
- **Tone**: [How we adapt to context]
- **Examples**:
  - Success messages: [Example]
  - Error messages: [Example]
  - Onboarding: [Example]

---

## 🎨 Color System

### Primary Colors
```
Primary:        #[HEX]  // Brand color - CTAs, key actions
Primary Dark:   #[HEX]  // Hover states, emphasis
Primary Light:  #[HEX]  // Backgrounds, subtle highlights
```

### Secondary Colors
```
Secondary:      #[HEX]  // Supporting elements
Accent:         #[HEX]  // Highlights, notifications
```

### Semantic Colors
```
Success:        #[HEX]  // Confirmations, completed actions
Warning:        #[HEX]  // Caution, important info
Error:          #[HEX]  // Errors, destructive actions
Info:           #[HEX]  // General information
```

### Neutral Colors
```
Background:     #[HEX]  // App background
Surface:        #[HEX]  // Cards, containers
Border:         #[HEX]  // Borders, dividers
Text Primary:   #[HEX]  // Main text
Text Secondary: #[HEX]  // Supporting text
Text Disabled:  #[HEX]  // Disabled state
```

### Accessibility Requirements
- **Contrast Ratios**:
  - Text: Minimum 4.5:1 (AA standard)
  - Large text: Minimum 3:1
  - UI components: Minimum 3:1
- **Color Blindness**: All critical info has non-color indicators
- **Dark Mode**: Full support with separate color palette

---

## 📝 Typography

### Font Families
```
Primary:    [Font Name]    // Body text, UI elements
Headings:   [Font Name]    // Titles, headings
Monospace:  [Font Name]    // Code, technical content
```

### Type Scale (Mobile-First)
```
Display:    48px / 52px    // Hero text
H1:         32px / 40px    // Page titles
H2:         24px / 32px    // Section headers
H3:         20px / 28px    // Subsections
H4:         18px / 24px    // Card titles
Body:       16px / 24px    // Default text
Small:      14px / 20px    // Captions, metadata
Tiny:       12px / 16px    // Fine print
```

### Font Weights
```
Regular:    400    // Body text
Medium:     500    // Emphasis
Semibold:   600    // Headings
Bold:       700    // Strong emphasis
```

### Dynamic Type Support (iOS/Android)
- Respect user's system font size preferences
- Test at accessibility sizes (200%+)
- Maintain hierarchy at all sizes

---

## 📐 Spacing System

### Base Unit: 4px
All spacing uses multiples of 4px for consistency.

```
XXS:    4px     // Tight spacing, compact layouts
XS:     8px     // Small gaps
SM:     12px    // Default inner padding
MD:     16px    // Default outer padding
LG:     24px    // Section spacing
XL:     32px    // Major section breaks
XXL:    48px    // Page-level spacing
```

### Mobile Considerations
- **Touch Targets**: Minimum 44x44pt (iOS) / 48x48dp (Android)
- **Screen Edges**: Minimum 16px padding from screen edge
- **Safe Areas**: Respect notch, home indicator, status bar

---

## 🧩 Component Library

### Buttons

**Primary Button**
```typescript
// Usage: Main CTAs, primary actions
<Button variant="primary" size="md">
  Sign In
</Button>

// Specs:
- Height: 48px (mobile), 44px (desktop)
- Padding: 16px horizontal
- Border radius: 8px
- Font: Semibold, 16px
- Hover: Darkens by 10%
- Active: Darkens by 20%
- Disabled: 40% opacity
```

**Secondary Button**
```typescript
// Usage: Secondary actions
<Button variant="secondary" size="md">
  Cancel
</Button>

// Specs:
- Same sizing as primary
- Border: 2px solid
- Background: Transparent
- Hover: Light background fill
```

**Ghost Button**
```typescript
// Usage: Tertiary actions, navigation
<Button variant="ghost" size="sm">
  Learn More
</Button>
```

### Input Fields

**Text Input**
```typescript
<Input 
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  error={errorMessage}
/>

// Specs:
- Height: 48px
- Padding: 12px horizontal
- Border: 1px, radius 8px
- Focus: 2px primary color border
- Error: Red border + error message below
- Label: Small weight, 14px, above input
```

**Text Area**
```typescript
<TextArea 
  label="Description"
  rows={4}
  maxLength={500}
/>

// Specs:
- Min height: 96px
- Max height: Unlimited with scroll
- Character counter if maxLength set
- Auto-resize option
```

### Cards

**Standard Card**
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardSubtitle>Subtitle</CardSubtitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Specs:
- Background: Surface color
- Border: 1px, radius 12px
- Padding: 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Hover: Subtle shadow increase
```

### Navigation

**Bottom Tab Bar (Mobile)**
```typescript
<TabBar>
  <Tab icon="home" label="Home" />
  <Tab icon="search" label="Explore" />
  <Tab icon="plus" label="Create" />
  <Tab icon="heart" label="Activity" />
  <Tab icon="user" label="Profile" />
</TabBar>

// Specs:
- Height: 80px (includes safe area)
- Icon size: 24x24px
- Label: 10px, below icon
- Active: Primary color
- Inactive: Text secondary color
- Badge: Small red dot for notifications
```

**Top Navigation Bar**
```typescript
<NavigationBar
  title="Page Title"
  leftAction={<BackButton />}
  rightAction={<MenuButton />}
/>

// Specs:
- Height: 56px + status bar
- Background: Surface color
- Title: H4, centered or left-aligned
- Icons: 24x24px touch targets
- Shadow on scroll
```

### Modals & Overlays

**Bottom Sheet (Mobile)**
```typescript
<BottomSheet 
  title="Options"
  snapPoints={[200, 400, '90%']}
>
  {/* Content */}
</BottomSheet>

// Specs:
- Corner radius: 16px top corners
- Handle: 40px wide, 4px tall, centered
- Backdrop: 60% opacity black
- Dismiss: Swipe down or tap backdrop
- Animation: Spring physics
```

**Modal Dialog**
```typescript
<Modal
  title="Confirm Action"
  description="Are you sure?"
  actions={[
    { label: "Cancel", variant: "secondary" },
    { label: "Confirm", variant: "primary" }
  ]}
/>

// Specs:
- Max width: 400px (centered)
- Padding: 24px
- Border radius: 16px
- Backdrop: 80% opacity black
- Focus trap: Tab cycles within modal
```

### Lists

**List Item**
```typescript
<ListItem
  leading={<Avatar />}
  title="Title"
  subtitle="Subtitle"
  trailing={<ChevronRight />}
  onPress={() => {}}
/>

// Specs:
- Height: 64px minimum
- Padding: 16px horizontal
- Leading/Trailing: 40x40px area
- Press: Background color change
- Swipe actions: Left/right reveals
```

---

## 🎭 Animation & Motion

### Timing Functions
```
Easing Standard: cubic-bezier(0.4, 0.0, 0.2, 1)
Easing Decelerate: cubic-bezier(0.0, 0.0, 0.2, 1)
Easing Accelerate: cubic-bezier(0.4, 0.0, 1, 1)
```

### Duration Guidelines
```
Instant:    100ms    // Icon state changes
Fast:       200ms    // Button presses, small movements
Standard:   300ms    // Page transitions, modals
Slow:       500ms    // Complex animations
```

### Common Patterns

**Page Transitions**
- iOS: Slide from right with parallax
- Android: Shared element transitions
- Duration: 300ms

**Loading States**
- Skeleton screens for initial load
- Spinners for in-progress actions
- Progress bars for known duration

**Micro-interactions**
- Button press: Scale to 0.95, duration 100ms
- Checkbox toggle: Spring animation
- Success: Checkmark with bounce
- Error: Shake animation (3x, 50ms each)

---

## 📱 Mobile-First Patterns

### iOS Specific

**Navigation**
- Use native navigation bar
- Swipe back gesture always enabled
- Large titles for main screens

**Interactions**
- Long press for context menus
- Pull to refresh with iOS style
- Haptic feedback for important actions

**Components**
- iOS-style switches, pickers
- Action sheets for options
- Share sheet for sharing

### Android Specific

**Material Design**
- Floating Action Button for primary action
- Bottom app bar option
- Material ripple effect on touch

**Navigation**
- Hardware back button support
- Navigation drawer option
- Predictive back gesture

**Components**
- Material switches, pickers
- Snackbars for feedback
- Bottom sheets for options

---

## ♿ Accessibility

### Requirements
Following WCAG 2.1 AA standards:

**Visual**
- ✅ All text meets contrast requirements
- ✅ Focus indicators clearly visible
- ✅ Animations respect `prefers-reduced-motion`
- ✅ Support for 200% zoom

**Interactive**
- ✅ All interactive elements keyboard accessible
- ✅ Tab order logical and predictable
- ✅ Touch targets minimum 44x44pt
- ✅ Gestures have alternative methods

**Screen Reader**
- ✅ All images have alt text
- ✅ Proper heading hierarchy
- ✅ ARIA labels for custom components
- ✅ Status announcements for dynamic content

### Testing Checklist
- [ ] VoiceOver (iOS) navigation works
- [ ] TalkBack (Android) navigation works
- [ ] Keyboard-only navigation complete
- [ ] Color blind simulation passes
- [ ] Zoom to 200% usable
- [ ] Dark mode full support

---

## 🎨 Platform Adaptations

### Responsive Breakpoints
```
Mobile:     < 768px     // Phone portrait/landscape
Tablet:     768-1024px  // Tablet portrait/landscape
Desktop:    > 1024px    // Web/desktop views
```

### Platform-Specific Overrides
When design system conflicts with platform conventions, **platform conventions win**.

**Example**:
- iOS: Navigation bar at top
- Android: Option for bottom app bar
- Web: Traditional top nav acceptable

---

## 📦 Implementation

### Design Tokens
All values exported as design tokens for code:

```typescript
// colors.ts
export const colors = {
  primary: '#[HEX]',
  // ... all colors
}

// typography.ts
export const typography = {
  display: { size: 48, lineHeight: 52 },
  // ... all styles
}

// spacing.ts
export const spacing = {
  xxs: 4,
  xs: 8,
  // ... all values
}
```

### Component Library
- React Native components in `/components`
- Storybook for component documentation
- Unit tests for all components
- Accessibility tests included

---

## 🔄 Evolution

This design system evolves based on:
- User feedback and research
- Platform guideline updates
- Accessibility improvements
- Performance optimizations

**Change Process**:
1. Propose change with reasoning
2. Review with design team
3. Update this spec
4. Update component library
5. Announce to team

---

## 📚 References

- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design 3](https://m3.material.io/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)

---

**AI Agents**: Reference this spec for all UI implementation. Follow patterns exactly. When in doubt, ask for clarification rather than inventing patterns.

