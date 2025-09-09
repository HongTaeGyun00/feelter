"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MySidebar({ isOpen, onClose }: MySidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "대시보드",
      href: "/my",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z"
          />
        </svg>
      ),
    },
    {
      title: "시청 이력",
      href: "/my/history",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "즐겨찾기",
      href: "/my/favorites",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "포인트",
      href: "/my/points",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="6 6 12 12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    },
    {
      title: "나의 카테고리",
      href: "/my/category",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      title: "설문조사",
      href: "/my/survey",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="2 2 14 14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "설정",
      href: "/my/settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === "/my") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay for mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 md:hidden"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }} /**햄거버 메뉴 클릭시 사이드바 우측 색상 0.2가 투명도*/
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        w-55 h-100 md:relative md:w-65
	   fixed z-40 md:translate-x-0
           bg-neutral-900 border border-gray-200 rounded-lg shadow-lg
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          `}
      >
        <div className="h-ful lpb-4">
          {/* User Info Section */}
          <div className="p-4 border-gray-200 rounded-lg">
            <div className="flex items-center border-b border-gray-200 pb-5 space-x-3">
              <div className="w-10 h-10 bg-[#b8e600] rounded-full flex items-center justify-center">
                <span className="text-black font-medium">영</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">영화매니아</p>
                <p className="text-xs text-gray-400">2,450 포인트</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${
                    isActive(item.href)
                      ? "text-[#b8e600]"
                      : "text-gray-300 hover:text-[#b8e600]"
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
