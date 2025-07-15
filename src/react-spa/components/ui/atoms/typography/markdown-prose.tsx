// Shared Markdown renderer with “prose” styling + niceties
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

const heading =
  (level: number) =>
  ({ node, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(String(props.children));
    const Tag = `h${level}` as const;
    return (
      <Tag id={id} {...props} className="group scroll-mt-28">
        <a
          href={`#${id}`}
          className="mr-1 -ml-6 opacity-0 group-hover:opacity-100 text-primary no-underline"
          aria-label="Anchor link"
        >
          #
        </a>
        {props.children}
      </Tag>
    );
  };

const MarkdownProse: React.FC<{ markdown: string }> = ({ markdown }) => (
  <article className="prose prose-neutral dark:prose-invert max-w-none animate-fade-in">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: heading(1),
        h2: heading(2),
        h3: heading(3),
        h4: heading(4),
        h5: heading(5),
        h6: heading(6),
        a: ({ node, ...props }) => <a {...props} className="text-primary hover:underline" />,
        blockquote: ({ node, ...props }) => (
          <blockquote
            {...props}
            className="border-l-4 border-primary pl-4 italic text-muted-foreground"
          />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  </article>
);

export default MarkdownProse;