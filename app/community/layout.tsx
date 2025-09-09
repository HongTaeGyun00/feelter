import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feelter Community - 영화 커뮤니티",
  description: "영화와 감정을 연결하는 특별한 커뮤니티 공간",
  keywords: ["영화", "드라마", "리뷰", "토론", "감정기록", "OTT"],
};

interface CommunityLayoutProps {
  children: React.ReactNode;
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  return <>{children}</>;
}
