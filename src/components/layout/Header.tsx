"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Layout, Menu, theme, Typography } from "antd";
import LanguageSwitcher from "./LanguageSwitcher";

const { Header: AntHeader } = Layout;

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const { token } = theme.useToken();

  const path = pathname.replace(`/${locale}`, "") || "/";

  const items = [
    {
      key: "/",
      label: <Link href={`/${locale}`}>Home</Link>,
    },
    {
      key: "/blog",
      label: <Link href={`/${locale}/blog`}>Blog</Link>,
    },
    {
      key: "/about",
      label: <Link href={`/${locale}/about`}>About</Link>,
    },
    {
      key: "/projects",
      label: <Link href={`/${locale}/projects`}>Projects</Link>,
    },
  ];

  const selectedKey = items.find(
    (item) => item.key !== "/" && path.startsWith(item.key)
  )?.key || "/";

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
        Academic Blog
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: token.paddingXS }}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          style={{ border: "none", flex: 1, minWidth: 0, background: "transparent" }}
        />
        <LanguageSwitcher locale={locale} />
      </div>
    </AntHeader>
  );
}
