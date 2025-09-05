import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import DevDataLoader from "@/components/DevDataLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feelter - 당신의 지금, 그 순간에",
  description: "OTT 플랫폼 컨텐츠 추천 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <DevDataLoader>{children}</DevDataLoader>
        </AuthProvider>
      </body>
    </html>
  );
}
