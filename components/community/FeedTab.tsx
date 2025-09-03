"use client";

import { useState, useEffect } from "react";
import { useCommunityStore } from "@/lib/stores/communityStore";
import ActivityCard from "./ActivityCard";

interface FeedTabProps {
  onCreatePost: () => void;
}

export default function FeedTab({ onCreatePost }: FeedTabProps) {
  const {
    posts,
    postsLoading,
    postsError,
    hasMorePosts,
    fetchPosts,
    loadMorePosts,
    togglePostLike,
    incrementPostViews,
    setCurrentUser,
    clearErrors,
  } = useCommunityStore();

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 컴포넌트 마운트시 데이터 로드
  useEffect(() => {
    // 임시로 현재 사용자 설정 (나중에 실제 인증으로 대체)
    setCurrentUser("user1");

    // 게시글 로드
    if (posts.length === 0) {
      fetchPosts(true);
    }
  }, []);

  // 무한 스크롤 처리
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMorePosts &&
        !postsLoading &&
        !isLoadingMore
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMorePosts, postsLoading, isLoadingMore]);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMorePosts) return;

    setIsLoadingMore(true);
    try {
      await loadMorePosts();
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handlePostClick = (postId: string) => {
    incrementPostViews(postId);
    // 게시글 상세 페이지로 이동하는 로직 추가 가능
  };

  const handleLike = (postId: string) => {
    togglePostLike(postId);
  };

  // 에러 처리
  if (postsError) {
    return (
      <div className="text-center py-16">
        <div className="text-red-400 mb-4">⚠️ {postsError}</div>
        <button
          onClick={() => {
            clearErrors();
            fetchPosts(true);
          }}
          className="px-6 py-3 rounded-lg font-medium hover:shadow-lg 
                     transition-all duration-300 border-2 border-transparent 
                     hover:border-white/20"
          style={{
            backgroundColor: "#CCFF00",
            color: "#111111",
            boxShadow: "0 4px 20px rgba(204, 255, 0, 0.3)",
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Create Post Button */}
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
        ✨ 새 글 작성하기
      </button>

      {/* Initial Loading */}
      {postsLoading && posts.length === 0 ? (
        <div className="flex justify-center items-center py-16">
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-white/10 shadow-sm">
            <div
              className="animate-spin w-8 h-8 border-2 border-t-transparent 
                        rounded-full mx-auto mb-3"
              style={{
                borderColor: "#CCFF00",
                borderTopColor: "transparent",
              }}
            ></div>
            <p style={{ color: "#CCFF00" }}>피드를 불러오는 중...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Feed Cards */}
          <div className="space-y-6">
            {posts.map((post) => (
              <ActivityCard
                key={post.id}
                type={post.type}
                avatar={post.authorAvatar}
                username={post.authorName}
                timestamp={new Date(post.createdAt).toLocaleString("ko-KR", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                activityType={
                  post.type === "review"
                    ? "리뷰"
                    : post.type === "discussion"
                    ? "토론"
                    : post.type === "emotion"
                    ? "감정"
                    : "일반"
                }
                title={post.title}
                preview={post.content}
                rating={post.rating}
                likes={post.likes}
                comments={post.comments}
                tags={post.tags}
                onClick={() => handlePostClick(post.id)}
                onLike={() => handleLike(post.id)}
                isLiked={post.likedBy?.includes("user1") || false} // 현재 사용자 ID 확인
              />
            ))}
          </div>

          {/* Load More Loading */}
          {(isLoadingMore || postsLoading) && posts.length > 0 && (
            <div className="flex justify-center items-center py-8">
              <div className="bg-gray-800 rounded-xl p-6 text-center border border-white/10 shadow-sm">
                <div
                  className="animate-spin w-8 h-8 border-2 border-t-transparent 
                            rounded-full mx-auto mb-3"
                  style={{
                    borderColor: "#CCFF00",
                    borderTopColor: "transparent",
                  }}
                ></div>
                <p style={{ color: "#CCFF00" }}>
                  더 많은 콘텐츠를 불러오는 중...
                </p>
              </div>
            </div>
          )}

          {/* No More Posts */}
          {!hasMorePosts && posts.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">모든 게시글을 불러왔습니다.</p>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!postsLoading && posts.length === 0 && !postsError && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-bold mb-2" style={{ color: "#CCFF00" }}>
            표시할 피드가 없습니다
          </h3>
          <p className="text-gray-400 mb-6">새 글을 작성해보세요.</p>
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
            첫 번째 글 작성하기
          </button>
        </div>
      )}
    </div>
  );
}
