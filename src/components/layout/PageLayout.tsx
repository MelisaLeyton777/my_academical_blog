"use client";

import { useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Layout, Menu, Button, theme, Grid, Typography } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BookOutlined,
  UserOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import LanguageSwitcher from "./LanguageSwitcher";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const { Header, Sider, Content } = Layout;
const messages = { en, es } as const;

const menuItemDefs = [
  { key: "/", icon: <HomeOutlined />, msgKey: "home" as const },
  { key: "/blog", icon: <BookOutlined />, msgKey: "blog" as const },
  { key: "/about", icon: <UserOutlined />, msgKey: "about" as const },
  { key: "/projects", icon: <FolderOpenOutlined />, msgKey: "projects" as const },
];

export default function PageLayout({
  children,
  locale,
  copyright,
}: {
  children: ReactNode;
  locale: string;
  copyright: string;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  const t = messages[locale as keyof typeof messages] ?? messages.en;
  const path = pathname.replace(`/${locale}`, "") || "/";

  const navigate = (href: string) => {
    router.push(href);
    if (isMobile) setCollapsed(true);
  };

  const menuItems = menuItemDefs.map(({ msgKey, ...rest }) => ({
    ...rest,
    label: t.nav[msgKey],
    onClick: () => navigate(`/${locale}${rest.key}`),
  }));

  const selectedKey =
    menuItemDefs.find(
      (item) => item.key !== "/" && path.startsWith(item.key),
    )?.key ?? "/";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth={isMobile ? 0 : 80}
        className="sidebar"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          insetInlineStart: 0,
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            href={`/${locale}`}
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: collapsed ? 14 : 18,
              lineHeight: "64px",
              whiteSpace: "nowrap",
            }}
          >
            {collapsed ? "AB" : t.home.title}
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: token.colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 9,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />
          <LanguageSwitcher locale={locale} />
        </Header>
        <Content
          style={{
            margin: isMobile ? 0 : 24,
            padding: isMobile ? 0 : 24,
            minHeight: 280,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <Typography.Text type="secondary">
              &copy; {new Date().getFullYear()} {copyright}
            </Typography.Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
