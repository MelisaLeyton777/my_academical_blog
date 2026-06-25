"use client";

import { useRouter } from "next/navigation";
import { Button, theme } from "antd";
import MarkdownContent from "./MarkdownContent";
import SocialLinks from "@/components/social/SocialLinks";

export default function HomeContent({
  content,
  cta,
  locale,
}: {
  content: string;
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
        justifyContent: "center",
        padding: `0 ${token.paddingLG}px`,
        minHeight: "calc(100vh - 64px - 72px)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <MarkdownContent content={content} />
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
    </div>
  );
}
