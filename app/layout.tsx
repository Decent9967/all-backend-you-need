import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "后端工程治理知识框架 · KB-01",
  description:
    "跨语言的通用知识体系：五个本性、三层知识模型、七个治理域，以及换语言也不失效的不变量。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&family=Instrument+Serif:ital@0;1&family=Noto+Serif+SC:wght@600;700&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
