"use client";

import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Layout,
  Menu,
  Button,
  theme,
  Grid,
  Typography,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BookOutlined,
  UserOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import LanguageSwitcher from "./LanguageSwitcher";

const { Header, Sider, Content } = Layout;

const menuItems = (locale: string) => [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link href={`/${locale}`}>Home</Link>,
  },
  {
    key: "/blog",
    icon: <BookOutlined />,
    label: <Link href={`/${locale}/blog`}>Blog</Link>,
  },
  {
    key: "/about",
    icon: <UserOutlined />,
    label: <Link href={`/${locale}/about`}>About</Link>,
  },
  {
    key: "/projects",
    icon: <FolderOpenOutlined />,
    label: <Link href={`/${locale}/projects`}>Projects</Link>,
  },
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
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  const path = pathname.replace(`/${locale}`, "") || "/";

  const selectedKey =
    menuItems(locale).find(
      (item) => item.key !== "/" && path.startsWith(item.key)
    )?.key ?? "/";

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth={isMobile ? 0 : 80}
        theme="dark"
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
            {collapsed ? "AB" : "Academic Blog"}
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems(locale)}
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
