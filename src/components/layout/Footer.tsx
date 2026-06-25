"use client";

import { Layout, Typography, theme } from "antd";

const { Footer: AntFooter } = Layout;

export default function Footer({ copyright }: { copyright: string }) {
  const { token } = theme.useToken();

  return (
    <AntFooter
      style={{
        textAlign: "center",
        background: token.colorBgLayout,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Typography.Text type="secondary">
        &copy; {new Date().getFullYear()} {copyright}
      </Typography.Text>
    </AntFooter>
  );
}
