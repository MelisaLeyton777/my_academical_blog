"use client";

import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { mode, toggle } = useTheme();

  return (
    <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
      <Button
        type="text"
        icon={mode === "light" ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggle}
        style={{ fontSize: 16, width: 48, height: 48 }}
      />
    </Tooltip>
  );
}
