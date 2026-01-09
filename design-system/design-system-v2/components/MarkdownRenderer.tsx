import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { MermaidBlock } from './MermaidBlock';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

// Custom components for react-markdown
const components: Components = {
  // Custom code block handler for mermaid and syntax highlighting
  code({ node, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const codeContent = String(children).replace(/\n$/, '');
    
    // Check if this is a mermaid diagram
    if (language === 'mermaid') {
      return <MermaidBlock chart={codeContent} />;
    }
    
    // For inline code (no language specified and single line)
    const isInline = !className && !codeContent.includes('\n');
    if (isInline) {
      return (
        <code 
          className="text-aqua-light bg-abyss-light px-2 py-0.5 rounded text-sm font-mono border border-aqua-light/20"
          {...props}
        >
          {children}
        </code>
      );
    }
    
    // For code blocks with syntax highlighting
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  
  // Custom pre wrapper for code blocks
  pre({ children, ...props }) {
    return (
      <pre 
        className="bg-abyss-mystic border border-aqua-light/20 rounded-2xl p-6 overflow-x-auto my-6 shadow-lg"
        {...props}
      >
        {children}
      </pre>
    );
  },
  
  // Custom heading components - linkable via rehype-autolink-headings
  h1({ children, id, ...props }) {
    return (
      <h1 
        id={id} 
        className="text-3xl font-black font-heading text-aqua-light border-b border-white/10 pb-4 mb-8 mt-0 scroll-mt-8"
        {...props}
      >
        {children}
      </h1>
    );
  },
  
  h2({ children, id, ...props }) {
    return (
      <h2 
        id={id} 
        className="text-2xl font-black font-heading text-teal-light mt-12 mb-6 scroll-mt-8"
        {...props}
      >
        {children}
      </h2>
    );
  },
  
  h3({ children, id, ...props }) {
    return (
      <h3 
        id={id} 
        className="text-xl font-bold font-heading text-moonlight mt-8 mb-4 scroll-mt-8"
        {...props}
      >
        {children}
      </h3>
    );
  },
  
  h4({ children, id, ...props }) {
    return (
      <h4 
        id={id} 
        className="text-lg font-bold font-heading text-moonlight/90 mt-6 mb-3 scroll-mt-8"
        {...props}
      >
        {children}
      </h4>
    );
  },
  
  // Paragraphs
  p({ children, ...props }) {
    return (
      <p className="text-moonlight/80 font-body leading-relaxed mb-4" {...props}>
        {children}
      </p>
    );
  },
  
  // Links
  a({ href, children, ...props }) {
    const isExternal = href?.startsWith('http');
    return (
      <a 
        href={href}
        className="text-aqua-light no-underline hover:underline hover:text-aqua-medium transition-colors"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {isExternal && (
          <svg className="inline-block w-3 h-3 ml-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    );
  },
  
  // Lists
  ul({ children, ...props }) {
    return (
      <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-moonlight/70 marker:text-aqua-light/50" {...props}>
        {children}
      </ul>
    );
  },
  
  ol({ children, ...props }) {
    return (
      <ol className="list-decimal list-outside ml-6 my-4 space-y-2 text-moonlight/70 marker:text-aqua-light/50" {...props}>
        {children}
      </ol>
    );
  },
  
  li({ children, ...props }) {
    return (
      <li className="leading-relaxed font-body pl-2" {...props}>
        {children}
      </li>
    );
  },
  
  // Blockquotes
  blockquote({ children, ...props }) {
    return (
      <blockquote 
        className="border-l-4 border-aqua-light pl-6 py-2 my-6 bg-aqua-light/5 rounded-r-lg italic text-moonlight/60"
        {...props}
      >
        {children}
      </blockquote>
    );
  },
  
  // Tables
  table({ children, ...props }) {
    return (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    );
  },
  
  thead({ children, ...props }) {
    return (
      <thead className="bg-white/5" {...props}>
        {children}
      </thead>
    );
  },
  
  th({ children, ...props }) {
    return (
      <th 
        className="text-left text-moonlight font-bold p-3 border border-white/10"
        {...props}
      >
        {children}
      </th>
    );
  },
  
  td({ children, ...props }) {
    return (
      <td 
        className="p-3 border border-white/10 text-moonlight/70"
        {...props}
      >
        {children}
      </td>
    );
  },
  
  tr({ children, ...props }) {
    return (
      <tr className="hover:bg-white/5 transition-colors" {...props}>
        {children}
      </tr>
    );
  },
  
  // Horizontal rules
  hr({ ...props }) {
    return (
      <hr className="my-10 border-white/10" {...props} />
    );
  },
  
  // Strong/bold text
  strong({ children, ...props }) {
    return (
      <strong className="text-moonlight font-bold" {...props}>
        {children}
      </strong>
    );
  },
  
  // Emphasized/italic text
  em({ children, ...props }) {
    return (
      <em className="italic text-moonlight/90" {...props}>
        {children}
      </em>
    );
  },
  
  // Images
  img({ src, alt, ...props }) {
    return (
      <img 
        src={src}
        alt={alt}
        className="rounded-xl shadow-lg my-6 max-w-full h-auto"
        loading="lazy"
        {...props}
      />
    );
  },
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          rehypeHighlight,
        ]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

