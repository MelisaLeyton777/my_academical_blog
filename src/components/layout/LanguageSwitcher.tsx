"use client";

import { useRouter } from "next/navigation";
import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();

  return (
    <Select
      value={locale}
      prefix={<GlobalOutlined />}
      variant="borderless"
      style={{ minWidth: 110 }}
      options={languages}
      onChange={(value) => router.push(`/${value}`)}
    />
  );
}
