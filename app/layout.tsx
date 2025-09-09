/* 원래있던 거 S*/
import type { Metadata } from "next";
import "./globals.css";
/* 원래있던 거 E*/
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Feelter - 당신의 지금, 그 순간에",
  description: "OTT 플랫폼 컨텐츠 추천 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 max-w-6xl mx-auto text-gray-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
