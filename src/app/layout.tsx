import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeProvider from "@/components/layout/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getDefaultTheme(): "light" | "dark" {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "dark" : "light";
}

export const metadata: Metadata = {
  title: "Academic Blog",
  description: "Exploring ideas in science and technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme = getDefaultTheme();

  return (
    <html data-theme={initialTheme} className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var h = new Date().getHours();
                var theme = (h >= 18 || h < 6) ? "dark" : "light";
                document.documentElement.setAttribute("data-theme", theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <AntdRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
