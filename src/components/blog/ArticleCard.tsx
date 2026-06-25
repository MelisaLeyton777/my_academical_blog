"use client";

import Link from "next/link";
import { Card, Typography, Tag, theme } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

type PostSummary = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
};

export default function ArticleCard({
  post,
  locale,
}: {
  post: PostSummary;
  locale: string;
}) {
  const { token } = theme.useToken();

  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <Card
        hoverable
        style={{ height: "100%" }}
        styles={{
          body: {
            padding: token.paddingLG,
            display: "flex",
            flexDirection: "column",
            gap: token.paddingXS,
          },
        }}
      >
        {post.date && (
          <Tag
            icon={<CalendarOutlined />}
            color="default"
            style={{ alignSelf: "flex-start" }}
          >
            {post.date}
          </Tag>
        )}
        <Card.Meta
          title={
            <Typography.Title level={4} style={{ margin: 0 }}>
              {post.title}
            </Typography.Title>
          }
          description={
            post.excerpt ? (
              <Paragraph
                type="secondary"
                ellipsis={{ rows: 2 }}
                style={{ margin: 0 }}
              >
                {post.excerpt}
              </Paragraph>
            ) : undefined
          }
        />
      </Card>
    </Link>
  );
}
