"use client";

import { useRouter } from "next/navigation";
import { Card, Button, theme } from "antd";
import MarkdownContent from "./MarkdownContent";
import SocialLinks from "@/components/social/SocialLinks";

export default function HomeContent({
  homeContent,
  aboutContent,
  cta,
  locale,
}: {
  homeContent: string;
  aboutContent: string;
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
        flexDirection: "column",
        alignItems: "center",
        padding: `${token.paddingXL}px ${token.paddingLG}px`,
        maxWidth: 720,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 600, width: "100%" }}>
        <MarkdownContent content={homeContent} />
        <div style={{ marginTop: token.marginLG }}>
          <SocialLinks />
        </div>
      </div>

      <div style={{ marginTop: token.marginXL }}>
        <Button
          type="primary"
          size="large"
          onClick={() => router.push(`/${locale}/blog`)}
        >
          {cta}
        </Button>
      </div>

      {aboutContent && (
        <Card
          style={{ width: "100%", marginTop: token.marginXXL }}
          styles={{ body: { padding: token.paddingLG } }}
        >
          <MarkdownContent content={aboutContent} />
          <div style={{ textAlign: "center", marginTop: token.marginLG }}>
            <SocialLinks />
          </div>
        </Card>
      )}
    </div>
  );
}
