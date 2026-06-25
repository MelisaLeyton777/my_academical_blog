"use client";

import { Typography, Tag, theme } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import ArticleContent from "@/components/blog/ArticleContent";

const { Title, Text } = Typography;

export default function PostContent({
  title,
  date,
  content,
}: {
  title: string;
  date?: string;
  content: string;
}) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        flex: 1,
        padding: `${token.paddingXL}px ${token.paddingLG}px`,
        maxWidth: 780,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <article>
        <header style={{ marginBottom: token.marginXL }}>
          <Title>{title}</Title>
          {date && (
            <Tag icon={<CalendarOutlined />} color="default">
              {date}
            </Tag>
          )}
        </header>
        <div
          style={{
            background: token.colorBgContainer,
            padding: token.paddingLG,
            borderRadius: token.borderRadiusLG,
          }}
        >
          <ArticleContent content={content} />
        </div>
      </article>
    </div>
  );
}
