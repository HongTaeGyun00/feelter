"use client";

import { useState, useEffect } from "react";

export interface ActivityCardProps {
  type: "review" | "discussion" | "cat" | "emotion" | "general";
  avatar: string;
  username: string;
  timestamp: string;
  activityType: string;
  title: string;
  preview?: string;
  rating?: number;
  likes: number;
  comments: number;
  shares?: number;
  tags?: string[];
  className?: string;
  onClick?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

export default function ActivityCard({
  type,
  avatar,
  username,
  timestamp,
  activityType,
  title,
  preview,
  rating,
  likes: initialLikes,
  comments,
  tags,
  className = "",
  onClick,
  onLike,
  isLiked: initialIsLiked = false,
}: ActivityCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  // props가 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setLikes(initialLikes);
    setIsLiked(initialIsLiked);
  }, [initialLikes, initialIsLiked]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트와 분리

    if (onLike) {
      onLike();
    } else {
      // Fallback for local state management
      if (isLiked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const getCardStyle = () => {
    switch (type) {
      case "review":
        return "border-yellow-500/30";
      case "discussion":
        return "border-blue-500/30";
      case "cat":
        return "border-orange-500/30";
      case "emotion":
        return "border-cyan-500/30";
      case "general":
        return "border-green-500/30";
      default:
        return "border-white/10";
    }
  };

  const renderStars = () => {
    if (rating === undefined) return null;

    return (
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="text-lg"
            style={{
              color: i < rating ? "#CCFF00" : "#333333",
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <article
      className={`
        bg-gray-800 backdrop-blur-lg border rounded-2xl p-6 mb-6 shadow-sm
        transition-all duration-300 hover:transform hover:-translate-y-1
        hover:shadow-lg cursor-pointer ${getCardStyle()} ${className}
      `}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${username}의 ${activityType} 게시글: ${title}`}
    >
      {/* Card Header */}
      <header className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #CCFF00 0%, #99CC00 100%)",
            color: "#111111",
          }}
        >
          {avatar}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white truncate">{username}</h3>
          <p className="text-sm text-gray-400">{timestamp}</p>
        </div>

        <div
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: "rgba(204, 255, 0, 0.2)" }}
        >
          <span className="text-xs font-medium" style={{ color: "#CCFF00" }}>
            {activityType}
          </span>
        </div>
      </header>

      {/* Card Content */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white mb-3 leading-tight">
          {title}
        </h2>

        {renderStars()}

        {preview && (
          <p className="text-gray-300 leading-relaxed text-sm line-clamp-3">
            {preview}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(204, 255, 0, 0.1)",
                  color: "#CCFF00",
                  border: "1px solid rgba(204, 255, 0, 0.3)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Interaction Bar */}
      <footer className="flex items-center gap-4 pt-4 border-t border-white/10">
        <button
          onClick={handleLike}
          className={`
            flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-300
            ${isLiked ? "text-black" : "text-gray-400 hover:text-white"}
          `}
          style={{
            backgroundColor: isLiked ? "#CCFF00" : "transparent",
          }}
          aria-label={`${isLiked ? "좋아요 취소" : "좋아요"} (${likes}개)`}
          aria-pressed={isLiked}
        >
          <span
            className={`transition-transform duration-300 ${
              isLiked ? "scale-125" : ""
            }`}
          >
            {isLiked ? "❤️" : "🤍"}
          </span>
          <span>{likes}</span>
        </button>

        <button
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm 
                          text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            // 댓글 모달 열기 또는 댓글 섹션으로 스크롤
          }}
        >
          <span>💬</span>
          <span>{comments}</span>
        </button>

        <button
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm 
                          text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            // 공유 기능 구현
          }}
        >
          <span>🔗</span>
          <span>공유</span>
        </button>

        {/* Special buttons for cat cards */}
        {type === "cat" && (
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm 
                            text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // 축하 기능 구현
            }}
          >
            <span>🎉</span>
            <span>축하</span>
          </button>
        )}
      </footer>
    </article>
  );
}
