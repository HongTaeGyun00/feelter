"use client";

import { useState, useEffect, useMemo } from "react";
import ActivityCard, { ActivityCardProps } from "./ActivityCard";

interface ReviewTabProps {
  onCreatePost: () => void;
}

const mockReviewData: ActivityCardProps[] = [
  {
    type: "review",
    avatar: "⭐",
    username: "리뷰마스터",
    timestamp: "1시간 전",
    activityType: "★★★★★",
    title: "존 윅 4",
    rating: 5,
    preview:
      "시리즈의 완벽한 마무리. 액션 시퀀스는 예술 수준이고, 키아누 리브스의 연기는 여전히 압도적입니다. 특히 계단 액션 장면은 영화사에 남을 명장면...",
    likes: 67,
    comments: 12,
    tags: ["액션", "키아누리브스", "존윅시리즈"],
  },
  {
    type: "review",
    avatar: "🎭",
    username: "무비크리틱",
    timestamp: "3시간 전",
    activityType: "★★★☆☆",
    title: "스파이더맨: 어크로스 더 유니버스",
    rating: 3,
    preview:
      "시각적으로는 혁신적이지만 스토리가 다소 복잡합니다. 애니메이션 기술은 정말 놀라운 수준이지만, 전작의 임팩트를 넘지는 못한 것 같아요...",
    likes: 34,
    comments: 28,
    tags: ["애니메이션", "스파이더맨", "마블"],
  },
  {
    type: "review",
    avatar: "🎬",
    username: "시네마틱러버",
    timestamp: "5시간 전",
    activityType: "★★★★☆",
    title: "가디언즈 오브 갤럭시 3",
    rating: 4,
    preview:
      "마블의 감동적인 작별 인사. 로켓의 백스토리가 특히 인상 깊었고, 팀의 마지막 모험이 가슴 뭉클했습니다. 완벽한 시리즈 마무리...",
    likes: 89,
    comments: 15,
    tags: ["마블", "가디언즈", "SF"],
  },
  {
    type: "review",
    avatar: "🎪",
    username: "필름애호가",
    timestamp: "8시간 전",
    activityType: "★★★★★",
    title: "바비",
    rating: 5,
    preview:
      "예상보다 훨씬 깊이 있는 작품. 사회적 메시지와 엔터테인먼트의 완벽한 조화. 마고 로비와 라이언 고슬링의 케미가 환상적이었습니다...",
    likes: 156,
    comments: 45,
    tags: ["바비", "코미디", "사회비평"],
  },
  {
    type: "review",
    avatar: "🎨",
    username: "아트시네마",
    timestamp: "12시간 전",
    activityType: "★★★☆☆",
    title: "인디아나 존스: 운명의 다이얼",
    rating: 3,
    preview:
      "해리슨 포드의 마지막 인디아나 존스. 노스탤지어는 있지만 새로운 재미는 부족했습니다. 그래도 시리즈 팬이라면 꼭 봐야 할 작품...",
    likes: 42,
    comments: 18,
    tags: ["인디아나존스", "어드벤처", "해리슨포드"],
  },
];

export default function ReviewTab({ onCreatePost }: ReviewTabProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isLoading] = useState(false);

  // Memoize filtered data to prevent unnecessary re-renders
  const filteredReviewData = useMemo(() => {
    if (!selectedRating) return mockReviewData;
    return mockReviewData.filter((item) => item.rating === selectedRating);
  }, [selectedRating]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl lg:text-4xl font-bold mb-4"
          style={{ color: "#CCFF00" }}
        >
          리뷰 광장
        </h1>
        <p className="text-gray-400 text-lg">
          솔직하고 다양한 영화 리뷰를 만나보세요
        </p>
      </div>

      {/* Rating Filter */}
      <div className="mb-6 p-4 bg-gray-800 rounded-xl border border-white/10 shadow-sm">
        <h3 className="text-sm font-medium text-gray-300 mb-3">평점별 필터</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedRating(null)}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
              selectedRating === null
                ? "text-black"
                : "text-gray-400 hover:text-white"
            }`}
            style={{
              backgroundColor:
                selectedRating === null ? "#CCFF00" : "transparent",
            }}
          >
            전체
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 flex items-center gap-1 ${
                selectedRating === rating
                  ? "text-black"
                  : `hover:text-white ${getRatingColor(rating)}`
              }`}
              style={{
                backgroundColor:
                  selectedRating === rating
                    ? "#CCFF00"
                    : "rgba(255, 255, 255, 0.1)",
              }}
            >
              <span>★</span>
              <span>{rating}점</span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Review Button */}
      <button
        onClick={onCreatePost}
        className="w-full mb-8 py-4 px-6 rounded-xl text-black 
                   font-bold text-lg hover:shadow-lg transition-all duration-300 
                   hover:-translate-y-1 border-2 border-transparent hover:border-white/20"
        style={{
          backgroundColor: "#CCFF00",
          boxShadow: "0 4px 20px rgba(204, 255, 0, 0.3)",
        }}
      >
        ⭐ 새 리뷰 작성하기
      </button>

      {/* Review Cards */}
      <div className="space-y-6">
        {filteredReviewData.map((item, index) => (
          <ActivityCard
            key={index}
            {...item}
            className="hover:shadow-yellow-500/10"
          />
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-white/10 shadow-sm">
          <div className="text-2xl font-bold" style={{ color: "#CCFF00" }}>
            127
          </div>
          <div className="text-sm text-gray-400">총 리뷰 수</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-white/10 shadow-sm">
          <div className="text-2xl font-bold text-green-400">4.2</div>
          <div className="text-sm text-gray-400">평균 평점</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-white/10 shadow-sm">
          <div className="text-2xl font-bold text-blue-400">89</div>
          <div className="text-sm text-gray-400">이번 주 리뷰</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-white/10 shadow-sm">
          <div className="text-2xl font-bold text-purple-400">34</div>
          <div className="text-sm text-gray-400">활성 리뷰어</div>
        </div>
      </div>

      {/* Empty State */}
      {filteredReviewData.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold mb-2" style={{ color: "#CCFF00" }}>
            해당하는 리뷰가 없습니다
          </h3>
          <p className="text-gray-400 mb-6">
            다른 평점을 선택하거나 새 리뷰를 작성해보세요.
          </p>
          <button
            onClick={onCreatePost}
            className="px-6 py-3 rounded-lg font-medium hover:shadow-lg 
                       transition-all duration-300 border-2 border-transparent 
                       hover:border-white/20"
            style={{
              backgroundColor: "#CCFF00",
              color: "#111111",
              boxShadow: "0 4px 20px rgba(204, 255, 0, 0.3)",
            }}
          >
            첫 번째 리뷰 작성하기
          </button>
        </div>
      )}
    </div>
  );
}
