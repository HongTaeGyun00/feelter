import React from "react";
import Image from "next/image";
import { BiHeart, BiMessageRounded } from "react-icons/bi";
import { ContentItem } from "@/lib/data";

interface ContentCardProps {
  content: ContentItem;
  onOpen: (content: ContentItem) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onOpen }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    alert(`'${content.title}'을(를) 찜 목록에 추가했습니다!`);
  };

  const handleOpenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen(content);
  };

  return (
    <div className="group relative w-[240px] h-[340px] bg-[#141A28] rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full h-[70%]">
        <Image
          src={content.imageUrl}
          alt={content.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-opacity duration-300 group-hover:opacity-50"
        />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={handleFavoriteClick}
            className="text-white transform transition-transform duration-200 hover:scale-125 hover:text-[#CCFF00]"
            aria-label="찜하기"
          >
            <BiHeart size={24} />
          </button>
          <button
            className="text-white transform transition-transform duration-200 hover:scale-125 hover:text-[#CCFF00]"
            aria-label="코멘트 보기"
          >
            <BiMessageRounded size={24} />
          </button>
        </div>
        <button className="text-white text-lg font-bold" onClick={handleOpenClick}>
          ▶ 상세보기
        </button>
      </div>

      {/* Meta Info */}
      <div className="p-4 h-[30%] flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-[18px] text-white truncate">
            {content.title}
          </h3>
          <p className="text-[14px] text-[#B0B3B8] mt-1">
            {content.year} / {content.genre}
          </p>
        </div>
        {content.rating && (
          <div className="self-start bg-[#CCFF00] text-black text-sm font-bold px-3 py-1 rounded-full">
            {content.rating.toFixed(1)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
