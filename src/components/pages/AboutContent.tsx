"use client";

import { Typography, Card, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function AboutContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        flex: 1,
        padding: `${token.paddingXL}px ${token.paddingLG}px`,
        maxWidth: 880,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Card
        styles={{ body: { padding: token.paddingLG } }}
      >
        <div style={{ textAlign: "center", marginBottom: token.marginLG }}>
          <UserOutlined style={{ fontSize: 48, color: token.colorPrimary }} />
        </div>
        <Title level={2} style={{ textAlign: "center" }}>
          {title}
        </Title>
        <Paragraph
          type="secondary"
          style={{ fontSize: token.fontSizeLG, lineHeight: 1.8 }}
        >
          {description}
        </Paragraph>
      </Card>
    </div>
  );
}
