"use client";

import { Typography, Divider, theme } from "antd";

const { Title, Paragraph } = Typography;

export default function ArticleContent({ content }: { content: string }) {
  const { token } = theme.useToken();

  return (
    <div style={{ lineHeight: token.lineHeight }}>
      {content.split("\n").map((line, i) => {
        if (line.startsWith("# ")) {
          return <Title key={i}>{line.slice(2)}</Title>;
        }
        if (line.startsWith("## ")) {
          return <Title key={i} level={2}>{line.slice(3)}</Title>;
        }
        if (line.startsWith("### ")) {
          return <Title key={i} level={3}>{line.slice(4)}</Title>;
        }
        if (line.trim() === "") {
          return (
            <Divider
              key={i}
              style={{ margin: `${token.marginSM}px 0` }}
            />
          );
        }
        return (
          <Paragraph
            key={i}
            style={{ fontSize: token.fontSizeLG, lineHeight: 1.8 }}
          >
            {line}
          </Paragraph>
        );
      })}
    </div>
  );
}
