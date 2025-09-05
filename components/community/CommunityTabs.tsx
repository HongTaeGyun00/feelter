"use client";

interface CommunityTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "feed", label: "피드", icon: "📱" },
  { id: "discussion", label: "토론 게시판", icon: "💭" },
  { id: "review", label: "리뷰 광장", icon: "⭐" },
  { id: "cats", label: "나의 고양이 식구들", icon: "🐱" },
  { id: "emotions", label: "나의 감정 기록실", icon: "💙" },
];

export default function CommunityTabs({
  activeTab,
  onTabChange,
}: CommunityTabsProps) {
  return (
    <nav
      className="bg-gray-800 backdrop-blur-lg border-b border-white/10 
                   rounded-lg mx-4 lg:mx-0 mb-6 transition-all duration-300 shadow-sm"
    >
      <div className="flex items-center px-4 lg:px-6 py-4 overflow-x-auto">
        <div className="flex gap-6 lg:gap-8 min-w-max w-full justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center gap-2 px-4 py-3 text-sm lg:text-base 
                font-medium transition-all duration-300 whitespace-nowrap rounded-lg
                ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-400 hover:text-white"
                }
              `}
              style={{
                backgroundColor:
                  activeTab === tab.id ? "#CCFF00" : "transparent",
              }}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-label={`${tab.label} 탭`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onTabChange(tab.id);
                }
              }}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>

              {/* Active Tab Indicator */}
              {activeTab === tab.id && (
                <div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                           w-8 h-1 rounded-full"
                  style={{ backgroundColor: "#CCFF00" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
