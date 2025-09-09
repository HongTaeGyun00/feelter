"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
// Since the environment can't resolve 'next/link', we will use a standard anchor tag.
// This will still work for navigation within the component.
interface NavbarProps {
  onMySidebarToggle?: () => void;
}

export default function Header({ onMySidebarToggle }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const isMyPage = pathname.startsWith("/my");

  // 검색을 실행하고 해당 작품 페이지로 이동하는 함수
  const performSearch = () => {
    if (searchQuery.trim() !== "") {
      // For demonstration, we'll navigate to a simple URL based on the query.
      // In a real application, this would be a more complex routing logic.
      // To fix the URL error, we prepend the origin to make it a valid absolute URL.
      window.location.href = `${
        window.location.origin
      }/works?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is 'Enter' and then perform the search
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  };

  const handleMySidebarToggle = () => {
    if (onMySidebarToggle) {
      onMySidebarToggle();
    } else if (
      typeof window !== "undefined" &&
      typeof (window as Window & { toggleMySidebar?: () => void })
        .toggleMySidebar === "function"
    ) {
      (window as Window & { toggleMySidebar?: () => void }).toggleMySidebar!();
    }
  };

  return (
    <header className="border-b border-neutral-500 bg-black p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* 1. 로고 - 클릭 시 메인 화면으로 이동 */}
        <Link href="/home" className="text-xl font-bold text-white">
          Feelter
        </Link>

        {/* 2. 검색창 (항상 보임) */}
        <div className="flex-grow flex justify-center mx-4">
          <div className="relative w-full max-w-[500px] flex items-center">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="w-full px-4 py-2 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* 돋보기 버튼 */}
            <button
              onClick={performSearch}
              className="absolute right-0 pr-3 focus:outline-none"
              aria-label="Search"
            >
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 3. 데스크톱 내비게이션 링크 */}
        <nav className="hidden md:flex text-sm space-x-4">
          <Link href="/home" className="text-gray-300 hover:text-[#ccff00]">
            Home
          </Link>
          <Link href="/search" className="text-gray-300 hover:text-[#ccff00]">
            Search
          </Link>
          <Link
            href="/community"
            className="text-gray-300 hover:text-[#ccff00]"
          >
            Community
          </Link>
          <Link href="/my" className="text-gray-300 hover:text-[#ccff00]">
            My
          </Link>
        </nav>

        {/* 4. 모바일 아이콘들 (마이페이지 & 햄버거) */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* 햄버거 아이콘 */}
          <button
            onClick={handleToggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* 마이페이지 아이콘 -toggle sidebar */}
          {isMyPage ? (
            <button onClick={handleMySidebarToggle} title="마이페이지 메뉴">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          ) : (
            <Link href="/my" className="text-white p-2" title="마이페이지">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* 5. 모바일 메뉴 (isMenuOpen 상태일 때만 보임) */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 space-y-2 border-t border-gray-700 mt-4 flex flex-col items-center">
          <Link
            href="/home"
            className="text-white w-full text-center py-2 hover:bg-neutral-800 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-white w-full text-center py-2 hover:bg-neutral-800 rounded-md"
          >
            Search
          </Link>
          <Link
            href="/community"
            className="text-white w-full text-center py-2 hover:bg-neutral-800 rounded-md"
          >
            Community
          </Link>
          <Link
            href="/my"
            className="text-white w-full text-center py-2 hover:bg-neutral-800 rounded-md"
          >
            My
          </Link>
        </div>
      )}
    </header>
  );
}
