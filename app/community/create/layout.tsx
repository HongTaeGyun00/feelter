import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "새 글 작성 - Feelter Community",
  description: "영화와 드라마에 대한 리뷰, 토론, 감정을 자유롭게 작성해보세요",
  keywords: ["영화", "드라마", "리뷰", "토론", "감정기록", "작성"],
};

interface CreateLayoutProps {
  children: React.ReactNode;
}

export default function CreateLayout({ children }: CreateLayoutProps) {
  return <>{children}</>;
}
