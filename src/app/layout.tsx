import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { resume } from "@/data/resume";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const title = `${resume.name} · ${resume.role}`;
// og:image 절대 경로 기준. Vercel에서는 프로덕션 도메인(커스텀 도메인을 붙이면 그 주소)이 들어온다
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: productionHost ? new URL(`https://${productionHost}`) : undefined,
  title,
  description: resume.summary,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title,
    description: resume.summary,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: resume.summary,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${jetbrainsMono.variable} antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
