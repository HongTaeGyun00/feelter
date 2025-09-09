"use client";

import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (sortKey: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  currentSort,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortOptions = [
    { key: "popular", label: "인기순" },
    { key: "latest", label: "최신순" },
    { key: "rating", label: "평점순" },
    { key: "title", label: "제목순" },
  ];

  const handleOptionClick = (key: string) => {
    onSortChange(key);
    setIsOpen(false);
  };

  const currentLabel =
    sortOptions.find((opt) => opt.key === currentSort)?.label || "최신순";

  return (
    <div className="relative z-10">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#2f3a4a] bg-[#1f2937] text-[#cbd5e1] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">{currentLabel}</span>
        <BiChevronDown
          size={20}
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-12 min-w-[160px] p-1 bg-[#141b2d] border border-[#2f3a4a] rounded-lg shadow-lg list-none m-0">
          {sortOptions.map((option) => (
            <li
              key={option.key}
              className={`p-2 rounded-md text-[#e5e7eb] cursor-pointer ${
                currentSort === option.key
                  ? "bg-[#0f172a]"
                  : "hover:bg-[#0f172a]"
              }`}
              onClick={() => handleOptionClick(option.key)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
