"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  Button,
  Input,
  Form,
  Typography,
  List,
  Tag,
  notification,
  theme,
  Grid,
} from "antd";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  SendOutlined,
} from "@ant-design/icons";
import MarkdownContent from "./MarkdownContent";
import SocialLinks from "@/components/social/SocialLinks";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

type PostSummary = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
};

export default function HomeContent({
  homeContent,
  aboutContent,
  latestPosts,
  cta,
  locale,
  contactDict,
}: {
  homeContent: string;
  aboutContent: string;
  latestPosts: PostSummary[];
  cta: string;
  locale: string;
  contactDict: {
    title: string;
    description: string;
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
  };
}) {
  const router = useRouter();
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const latestPostsTitle =
    locale === "es" ? "Últimos Artículos" : "Latest Posts";
  const viewAllText = locale === "es" ? "Ver todos" : "View all";

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setSubmitting(true);

      // Simulate send — replace with actual email service
      await new Promise((r) => setTimeout(r, 800));

      notification.success({
        message: contactDict.success,
        placement: "topRight",
      });

      form.resetFields();
    } catch {
      // validation failed
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: token.marginXXL,
        padding: `0 ${token.paddingLG}px`,
        maxWidth: 960,
        margin: "0 auto",
        width: "100%",
        paddingTop: token.paddingXL,
        paddingBottom: token.paddingXL * 2,
      }}
    >
      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: token.marginXL,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <MarkdownContent content={homeContent} />
          <div style={{ marginTop: token.marginMD }}>
            <SocialLinks size="small" />
          </div>
          {cta && (
            <div style={{ marginTop: token.marginLG }}>
              <Button
                type="primary"
                size="large"
                onClick={() => router.push(`/${locale}/blog`)}
              >
                {cta}
              </Button>
            </div>
          )}
        </div>

        <div style={{ flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.jpg"
            alt="Profile"
            width={isMobile ? 200 : 280}
            height={isMobile ? 200 : 280}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: `4px solid ${token.colorBorderSecondary}`,
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          PRESENTACIÓN (About)
          ════════════════════════════════════════ */}
      {aboutContent && (
        <Card id="about" styles={{ body: { padding: token.paddingLG } }}>
          <MarkdownContent content={aboutContent} />
        </Card>
      )}

      {/* ════════════════════════════════════════
          ÚLTIMOS POSTS
          ════════════════════════════════════════ */}
      {latestPosts.length > 0 && (
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: token.marginMD,
            }}
          >
            <Title level={3} style={{ margin: 0 }}>
              {latestPostsTitle}
            </Title>
            <Link href={`/${locale}/blog`}>
              <Button type="link" icon={<ArrowRightOutlined />}>
                {viewAllText}
              </Button>
            </Link>
          </div>

          <List
            grid={{
              gutter: [token.paddingLG, token.paddingLG],
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={latestPosts.slice(0, 3)}
            renderItem={(post) => (
              <List.Item>
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <Card
                    hoverable
                    styles={{
                      body: {
                        padding: token.paddingMD,
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
                    <Text strong>{post.title}</Text>
                    {post.excerpt && (
                      <Paragraph
                        type="secondary"
                        style={{ fontSize: token.fontSizeSM, margin: 0 }}
                        ellipsis={{ rows: 2 }}
                      >
                        {post.excerpt}
                      </Paragraph>
                    )}
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        </section>
      )}

      {/* ════════════════════════════════════════
          CONTACTO
          ════════════════════════════════════════ */}
      <Card id="contact" styles={{ body: { padding: token.paddingLG } }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: token.marginXL,
            alignItems: isMobile ? undefined : "flex-start",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <Title level={3}>{contactDict.title}</Title>
            <Paragraph type="secondary" style={{ fontSize: token.fontSizeLG }}>
              {contactDict.description}
            </Paragraph>
          </div>

          <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ maxWidth: 480 }}
            >
              <Form.Item
                name="name"
                label={contactDict.name}
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label={contactDict.email}
                rules={[
                  { required: true, message: "" },
                  { type: "email", message: "" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="message"
                label={contactDict.message}
                rules={[{ required: true, message: "" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  loading={submitting}
                >
                  {contactDict.send}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
}
