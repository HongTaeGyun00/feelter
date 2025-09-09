"use client";

import { useState } from "react";
import { BiSearch, BiMenuAltLeft } from "react-icons/bi";

interface SearchBarProps {
  onMenuClick: () => void;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onMenuClick, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="py-20 text-center">
      <h1 className="font-bold text-[36px] text-white leading-tight">
        모든 OTT 콘텐츠를 한 번에 찾으세요
      </h1>
      <p className="font-medium text-[20px] text-[#B0B3B8] mt-4 mb-8">
        넷플릭스, 디즈니+, 웨이브, 티빙… 여기서 전부 검색하세요
      </p>
      <form
        role="search"
        className="flex items-center w-[480px] mx-auto bg-[#141A28] rounded-full p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#CCFF00]"
        onSubmit={handleSearch}
      >
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={onMenuClick}
          className="p-2 text-[#B0B3B8] hover:text-white"
        >
          <BiMenuAltLeft size={28} />
        </button>
        <div className="pl-2 pr-2 border-l border-gray-700">
          <BiSearch size={24} className="text-[#6C757D]" />
        </div>
        <input
          type="text"
          name="searchQuery"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화, 드라마, 예능을 검색해보세요"
          className="flex-1 min-w-0 py-2 bg-transparent text-white text-base outline-none"
        />
        <button
          className="font-bold uppercase bg-[#CCFF00] text-black rounded-full px-6 py-2.5 text-[16px] hover:shadow-[0_0_15px_#CCFF00] transition-shadow duration-300"
          aria-label="검색"
          type="submit"
        >
          검색
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
