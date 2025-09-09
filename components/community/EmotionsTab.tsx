"use client";

import { useState, useEffect } from "react";
import { useCommunityStore } from "@/lib/stores/communityStore";

interface EmotionRecord {
  id: string;
  userId: string;
  movieTitle: string;
  emotion: string;
  emoji: string;
  text: string;
  intensity: number; // 1-5
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface EmotionsTabProps {
  onCreatePost: () => void;
}

const emotionColors: Record<string, string> = {
  슬픔: "from-blue-500 to-indigo-600",
  흥분: "from-red-500 to-orange-500",
  따뜻함: "from-pink-400 to-rose-500",
  불안: "from-gray-500 to-gray-700",
  그리움: "from-purple-400 to-purple-600",
  기쁨: "from-yellow-400 to-orange-400",
  분노: "from-red-600 to-red-800",
  두려움: "from-gray-600 to-black",
};

export default function EmotionsTab({ onCreatePost }: EmotionsTabProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<EmotionRecord | null>(
    null
  );

  const {
    emotions,
    emotionsLoading,
    emotionsError,
    fetchEmotions,
    currentUserId,
    clearErrors,
  } = useCommunityStore();

  // 컴포넌트 마운트시 감정 데이터 로드
  useEffect(() => {
    if (currentUserId) {
      fetchEmotions(currentUserId);
    }
  }, [currentUserId, fetchEmotions]);

  const getEmotionColor = (emotion: string) => {
    return emotionColors[emotion] || "from-gray-400 to-gray-600";
  };

  const getIntensityStars = (intensity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < intensity ? "text-yellow-400" : "text-gray-600"}
      >
        ★
      </span>
    ));
  };

  const uniqueEmotions = Array.from(
    new Set(emotions.map((item) => item.emotion))
  );

  const filteredData = selectedEmotion
    ? emotions.filter((item) => item.emotion === selectedEmotion)
    : emotions;

  const handleRecordClick = (record: EmotionRecord) => {
    setSelectedRecord(record);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "어제";
    if (diffDays <= 7) return `${diffDays}일 전`;

    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  };

  // 로딩 상태
  if (emotionsLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center py-16">
          <div className="bg-gray-800 rounded-xl p-6 text-center border border-white/10 shadow-sm">
            <div
              className="animate-spin w-8 h-8 border-2 border-t-transparent 
                        rounded-full mx-auto mb-3"
              style={{
                borderColor: "#CCFF00",
                borderTopColor: "transparent",
              }}
            />
            <p style={{ color: "#CCFF00" }}>감정 기록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (emotionsError) {
    return (
      <div className="w-full">
        <div className="text-center py-16">
          <div className="text-red-400 mb-4">⚠️ {emotionsError}</div>
          <button
            onClick={() => {
              clearErrors();
              if (currentUserId) fetchEmotions(currentUserId);
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
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl lg:text-4xl font-bold mb-4"
          style={{ color: "#CCFF00" }}
        >
          나의 감정 기록실
        </h1>
        <p className="text-gray-400 text-lg">
          영화로 느낀 감정들을 기록하고 추억해보세요
        </p>
      </div>

      {/* Emotion Filter */}
      {uniqueEmotions.length > 0 && (
        <div className="mb-6 p-4 bg-gray-800 rounded-xl border border-white/10 shadow-sm">
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            감정별 필터
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedEmotion(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedEmotion === null
                  ? "text-black"
                  : "text-gray-400 hover:text-white hover:bg-white/20"
              }`}
              style={{
                backgroundColor:
                  selectedEmotion === null ? "#CCFF00" : "transparent",
              }}
            >
              전체
            </button>
            {uniqueEmotions.map((emotion) => {
              const emotionData = emotions.find(
                (item) => item.emotion === emotion
              );
              return (
                <button
                  key={emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2 ${
                    selectedEmotion === emotion
                      ? "text-black"
                      : "text-white hover:bg-white/20"
                  }`}
                  style={{
                    backgroundColor:
                      selectedEmotion === emotion
                        ? "#CCFF00"
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <span>{emotionData?.emoji}</span>
                  <span>{emotion}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Emotion Button */}
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
        💙 새 감정 기록하기
      </button>

      {/* Emotion Records Grid */}
      {filteredData.length > 0 ? (
        <div className="space-y-4 mb-8">
          {filteredData.map((record) => (
            <div
              key={record.id}
              onClick={() => handleRecordClick(record)}
              className="bg-gray-800 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-sm
                         cursor-pointer transition-all duration-300 hover:-translate-y-1 
                         hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                {/* Emotion Icon */}
                <div
                  className={`
                  w-16 h-16 rounded-full bg-gradient-to-r ${getEmotionColor(
                    record.emotion
                  )}
                  flex items-center justify-center text-2xl flex-shrink-0
                `}
                >
                  {record.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {record.movieTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{formatDate(record.createdAt)}</span>
                      <div className="flex">
                        {getIntensityStars(record.intensity)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-sm font-medium text-white
                      bg-gradient-to-r ${getEmotionColor(record.emotion)}
                    `}
                    >
                      {record.emotion}
                    </span>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm mb-3 line-clamp-2">
                    {record.text}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {record.tags.map((tag, index) => (
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
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 mb-8">
          <div className="text-6xl mb-4">💙</div>
          <h3 className="text-xl font-bold mb-2" style={{ color: "#CCFF00" }}>
            {selectedEmotion
              ? `${selectedEmotion} 감정 기록이 없습니다`
              : "감정 기록이 없습니다"}
          </h3>
          <p className="text-gray-400 mb-6">
            {selectedEmotion ? "다른 감정을 선택하거나" : ""} 첫 번째 감정을
            기록해보세요.
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
            첫 감정 기록하기
          </button>
        </div>
      )}

      {/* Emotion Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-sm relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 
                         rounded-full flex items-center justify-center text-gray-400 hover:text-white
                         transition-all duration-300"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div
                className={`
                w-20 h-20 mx-auto mb-4 rounded-full 
                bg-gradient-to-r ${getEmotionColor(selectedRecord.emotion)}
                flex items-center justify-center text-4xl
              `}
              >
                {selectedRecord.emoji}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedRecord.movieTitle}
              </h2>
              <div className="flex items-center justify-center gap-4 text-gray-400">
                <span>{formatDate(selectedRecord.createdAt)}</span>
                <div className="flex">
                  {getIntensityStars(selectedRecord.intensity)}
                </div>
              </div>
            </div>

            {/* Emotion Badge */}
            <div className="text-center mb-6">
              <span
                className={`
                inline-block px-6 py-3 rounded-full text-lg font-bold text-white
                bg-gradient-to-r ${getEmotionColor(selectedRecord.emotion)}
              `}
              >
                {selectedRecord.emotion}
              </span>
            </div>

            {/* Full Text */}
            <div className="mb-6">
              <h3
                className="font-bold mb-3 text-lg"
                style={{ color: "#CCFF00" }}
              >
                감정 기록
              </h3>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  {selectedRecord.text}
                </p>
              </div>
            </div>

            {/* Tags */}
            {selectedRecord.tags.length > 0 && (
              <div className="mb-6">
                <h3
                  className="font-bold mb-3 text-lg"
                  style={{ color: "#CCFF00" }}
                >
                  태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="border border-white/20 px-4 py-2 rounded-full text-gray-300"
                      style={{ backgroundColor: "rgba(204, 255, 0, 0.1)" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 px-6 rounded-xl text-black font-bold hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "#CCFF00" }}
                onClick={() => setSelectedRecord(null)}
              >
                편집하기
              </button>
              <button
                className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all duration-300"
                onClick={() => setSelectedRecord(null)}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {emotions.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-white/10 shadow-sm">
            <div className="text-2xl font-bold" style={{ color: "#CCFF00" }}>
              {emotions.length}
            </div>
            <div className="text-sm text-gray-400">총 기록 수</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-white/10 shadow-sm">
            <div className="text-2xl font-bold text-pink-400">
              {uniqueEmotions.length}
            </div>
            <div className="text-sm text-gray-400">느낀 감정 종류</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-white/10 shadow-sm">
            <div className="text-2xl font-bold text-blue-400">
              {emotions.length > 0
                ? Math.round(
                    (emotions.reduce((sum, item) => sum + item.intensity, 0) /
                      emotions.length) *
                      10
                  ) / 10
                : 0}
            </div>
            <div className="text-sm text-gray-400">평균 감정 강도</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-white/10 shadow-sm">
            <div className="text-2xl font-bold text-green-400">
              {
                emotions.filter(
                  (item) =>
                    new Date(item.createdAt) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
              }
            </div>
            <div className="text-sm text-gray-400">이번 주 기록</div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gray-800 border border-white/10 rounded-2xl p-6 shadow-sm">
        <h3
          className="text-lg font-bold mb-3 flex items-center gap-2"
          style={{ color: "#CCFF00" }}
        >
          💡 감정 기록 팁
        </h3>
        <div className="space-y-2 text-gray-300 text-sm">
          <p>• 영화를 본 직후의 솔직한 감정을 기록해보세요</p>
          <p>• 구체적인 장면이나 대사를 언급하면 더 생생한 기록이 됩니다</p>
          <p>• 감정의 강도를 별점으로 표현해 나중에 비교해볼 수 있어요</p>
          <p>• 태그를 활용해 비슷한 감정의 영화들을 찾아보세요</p>
        </div>
      </div>
    </div>
  );
}
