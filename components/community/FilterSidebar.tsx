"use client";

interface FilterSidebarProps {
  activeFilter: string;
  sortBy: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const filterOptions = ["전체", "리뷰", "토론", "고양이 성장 소식"];
const sortOptions = ["최신순", "인기순", "댓글순"];

export default function FilterSidebar({
  activeFilter,
  sortBy,
  onFilterChange,
  onSortChange,
}: FilterSidebarProps) {
  return (
    <div className="sticky top-40 space-y-6">
      {/* User Summary */}
      <div className="bg-gray-800 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-sm">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 
                          flex items-center justify-center text-2xl"
            style={{
              background: "linear-gradient(135deg, #CCFF00 0%, #99CC00 100%)",
              color: "#111111",
            }}
          >
            😊
          </div>
          <h3 className="font-bold text-lg mb-2 text-white">영화매니아</h3>
          <div
            className="flex items-center justify-center gap-2 mb-4 
                          rounded-full px-3 py-1"
            style={{ backgroundColor: "rgba(204, 255, 0, 0.2)" }}
          >
            <span>🐱</span>
            <span className="text-sm" style={{ color: "#CCFF00" }}>
              Lv.5 털뭉치
            </span>
          </div>
          <div className="space-y-2">
            <button
              className="w-full py-2 px-3 hover:bg-white/20 
                             rounded-lg text-sm transition-all duration-300 text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              aria-label="내 활동 보기"
            >
              내 활동 보기
            </button>
            <button
              className="w-full py-2 px-3 hover:bg-white/20 
                             rounded-lg text-sm transition-all duration-300 text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              aria-label="프로필 편집"
            >
              프로필 편집
            </button>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="bg-gray-800 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold mb-4" style={{ color: "#CCFF00" }}>
          필터
        </h3>
        <div className="space-y-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`
                w-full text-left py-2 px-3 rounded-lg text-sm transition-all duration-300
                ${
                  activeFilter === filter
                    ? "text-black"
                    : "text-gray-300 hover:text-white"
                }
              `}
              style={{
                backgroundColor:
                  activeFilter === filter
                    ? "#CCFF00"
                    : "rgba(255, 255, 255, 0.1)",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-gray-800 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold mb-4" style={{ color: "#CCFF00" }}>
          정렬
        </h3>
        <div className="space-y-2">
          {sortOptions.map((sort) => (
            <button
              key={sort}
              onClick={() => onSortChange(sort)}
              className={`
                w-full text-left py-2 px-3 rounded-lg text-sm transition-all duration-300
                ${
                  sortBy === sort
                    ? "text-black"
                    : "text-gray-300 hover:text-white"
                }
              `}
              style={{
                backgroundColor:
                  sortBy === sort ? "#CCFF00" : "rgba(255, 255, 255, 0.1)",
              }}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
