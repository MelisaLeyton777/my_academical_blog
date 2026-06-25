"use client";

import { useRouter } from "next/navigation";
import { Button, Typography, Flex, theme } from "antd";

const { Title, Paragraph } = Typography;

export default function HomeContent({
  title,
  subtitle,
  cta,
  locale,
}: {
  title: string;
  subtitle: string;
  cta: string;
  locale: string;
}) {
  const router = useRouter();
  const { token } = theme.useToken();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `0 ${token.paddingLG}px`,
        minHeight: "calc(100vh - 64px - 72px)",
      }}
    >
      <Flex vertical align="center" gap="large" style={{ textAlign: "center" }}>
        <Title style={{ margin: 0 }}>{title}</Title>
        <Paragraph
          type="secondary"
          style={{ fontSize: token.fontSizeLG, maxWidth: 480, margin: 0 }}
        >
          {subtitle}
        </Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() => router.push(`/${locale}/blog`)}
        >
          {cta}
        </Button>
      </Flex>
    </div>
  );
}
