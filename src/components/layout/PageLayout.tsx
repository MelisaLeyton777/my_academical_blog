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
  FileTextOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const { Header, Sider, Content } = Layout;
const messages = { en, es } as const;

type MenuItemDef = {
  key: string;
  icon: React.ReactNode;
  msgKey: "home" | "blog" | "projects" | "publications" | "cv";
  isDownload?: boolean;
};

const menuItemDefs: MenuItemDef[] = [
  { key: "/", icon: <HomeOutlined />, msgKey: "home" },
  { key: "/blog", icon: <BookOutlined />, msgKey: "blog" },
  { key: "/projects", icon: <FolderOpenOutlined />, msgKey: "projects" },
  { key: "/publications", icon: <ExperimentOutlined />, msgKey: "publications" },
  { key: "/cv", icon: <FileTextOutlined />, msgKey: "cv", isDownload: true },
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

  const menuItems = menuItemDefs.map(({ msgKey, isDownload, ...rest }) => ({
    ...rest,
    label: t.nav[msgKey],
    onClick: () => {
      if (isDownload) {
        const a = document.createElement("a");
        a.href = "/cv.pdf";
        a.download = "CV.pdf";
        a.click();
      } else {
        router.push(`/${locale}${rest.key}`);
      }
      if (isMobile) setCollapsed(true);
    },
  }));

  const selectedKey =
    menuItemDefs.find(
      (item) => !item.isDownload && item.key !== "/" && path.startsWith(item.key),
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
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
          </div>
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
