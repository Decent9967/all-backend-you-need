/** @type {import('next').NextConfig} */

/* GitHub Pages 项目站部署时由 CI 注入：
   NEXT_PUBLIC_BASE_PATH=/仓库名 + NEXT_EXPORT=1 静态导出；本地开发不受影响 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isExport = process.env.NEXT_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(isExport ? { output: "export" } : {}),
};

export default nextConfig;
