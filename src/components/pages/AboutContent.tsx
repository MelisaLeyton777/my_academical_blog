"use client";

import { Card, theme } from "antd";
import MarkdownContent from "./MarkdownContent";
import SocialLinks from "@/components/social/SocialLinks";

export default function AboutContent({
  content,
}: {
  content: string;
}) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        flex: 1,
        padding: `${token.paddingXL}px ${token.paddingLG}px`,
        maxWidth: 720,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Card
        styles={{ body: { padding: token.paddingLG } }}
      >
        <div style={{ textAlign: "center", marginBottom: token.marginLG }}>
          <MarkdownContent content={content} />
        </div>
        <div style={{ textAlign: "center" }}>
          <SocialLinks />
        </div>
      </Card>
    </div>
  );
}
