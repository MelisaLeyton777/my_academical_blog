"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typography, theme } from "antd";

const { Title, Paragraph } = Typography;

export default function MarkdownContent({
  content,
}: {
  content: string;
}) {
  const { token } = theme.useToken();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <Title style={{ margin: 0 }}>{children}</Title>,
        h2: ({ children }) => (
          <Title level={2} style={{ marginTop: token.marginLG }}>
            {children}
          </Title>
        ),
        h3: ({ children }) => (
          <Title level={3} style={{ marginTop: token.marginMD }}>
            {children}
          </Title>
        ),
        p: ({ children }) => (
          <Paragraph
            style={{
              fontSize: token.fontSizeLG,
              lineHeight: 1.8,
              marginBottom: token.marginMD,
            }}
          >
            {children}
          </Paragraph>
        ),
        ul: ({ children }) => (
          <ul style={{ fontSize: token.fontSizeLG, lineHeight: 1.8 }}>
            {children}
          </ul>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
