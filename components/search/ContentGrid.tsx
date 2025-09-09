"use client";

import React from "react";
import ContentCard from "./ContentCard";
import Pagination from "./Pagination";
import SortDropdown from "./SortDropdown";
import { ContentItem } from "@/lib/data";

interface ContentGridProps {
  content: ContentItem[];
  totalItems: number;
  currentSort: string;
  setCurrentSort: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCardClick: (content: ContentItem) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  content,
  totalItems,
  currentSort,
  setCurrentSort,
  currentPage,
  totalPages,
  onPageChange,
  onCardClick,
}) => {
  return (
    <section className="bg-[#141A28] rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-semibold text-[20px] text-white">
          {totalItems}개의 콘텐츠를 찾았습니다
        </h2>
        <SortDropdown currentSort={currentSort} onSortChange={setCurrentSort} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.map((item) => (
          <ContentCard key={item.title} content={item} onOpen={onCardClick} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
};

export default ContentGrid;
