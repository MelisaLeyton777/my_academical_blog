"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Layout, Menu, theme } from "antd";
import LanguageSwitcher from "./LanguageSwitcher";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const { Header: AntHeader } = Layout;
const messages = { en, es } as const;

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token } = theme.useToken();

  const t = messages[locale as keyof typeof messages] ?? messages.en;
  const path = pathname.replace(`/${locale}`, "") || "/";

  const items = [
    {
      key: "/",
      label: t.nav.home,
      onClick: () => router.push(`/${locale}`),
    },
    {
      key: "/blog",
      label: t.nav.blog,
      onClick: () => router.push(`/${locale}/blog`),
    },
    {
      key: "/about",
      label: t.nav.about,
      onClick: () => router.push(`/${locale}/about`),
    },
    {
      key: "/projects",
      label: t.nav.projects,
      onClick: () => router.push(`/${locale}/projects`),
    },
  ];

  const selectedKey =
    items.find((item) => item.key !== "/" && path.startsWith(item.key))?.key ||
    "/";

  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        padding: `0 ${token.paddingXL}px`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Link
        href={`/${locale}`}
        style={{
          fontWeight: 600,
          fontSize: 18,
          color: token.colorText,
          lineHeight: "64px",
          whiteSpace: "nowrap",
          marginRight: 24,
        }}
      >
        {t.home.title}
      </Link>
      <div
        style={{ display: "flex", alignItems: "center", gap: token.paddingXS }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          style={{
            border: "none",
            flex: 1,
            minWidth: 0,
          }}
        />
        <LanguageSwitcher locale={locale} />
      </div>
    </AntHeader>
  );
}
