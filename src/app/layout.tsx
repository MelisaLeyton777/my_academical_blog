import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academic Blog",
  description: "Exploring ideas in science and technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              cssVar: { prefix: "ant", key: "app" },
              algorithm: theme.defaultAlgorithm,
              token: {
                colorPrimary: "#1677ff",
                borderRadius: 8,
                fontFamily:
                  "var(--font-geist-sans), -apple-system, sans-serif",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
