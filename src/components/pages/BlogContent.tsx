"use client";

import { Typography, List, Card, Tag, theme } from "antd";
import Link from "next/link";
import { CalendarOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

type PostSummary = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
};

export default function BlogContent({
  title,
  description,
  posts,
  locale,
}: {
  title: string;
  description: string;
  posts: PostSummary[];
  locale: string;
}) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        flex: 1,
        padding: `${token.paddingXL}px ${token.paddingLG}px`,
        maxWidth: 960,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Title level={2}>{title}</Title>
      <Paragraph
        type="secondary"
        style={{
          fontSize: token.fontSizeLG,
          marginBottom: token.marginXL,
        }}
      >
        {description}
      </Paragraph>
      <List
        grid={{
          gutter: [token.paddingLG, token.paddingLG],
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Link href={`/${locale}/blog/${post.slug}`}>
              <Card
                hoverable
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
          </List.Item>
        )}
      />
    </div>
  );
}
