'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  BiPlayCircle,
  BiPlusCircle,
  BiShareAlt,
  BiX,
  BiChevronDown,
  BiChevronUp,
} from 'react-icons/bi';
import { ContentItem } from '@/lib/data';

interface MovieModalProps {
  content: ContentItem | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ content, onClose }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const descriptionText =
    content?.description ||
    '이 영화에 대한 설명이 아직 없습니다. 하지만 분명 멋진 영화일 겁니다! 스파이더맨의 정체가 탄로난 이후, 피터 파커는 일상으로 돌아가기 위해 닥터 스트레인지의 도움을 받지만, 주문의 부작용으로 멀티버스가 열리면서 다른 차원의 위협들이 나타나기 시작한다.';

  const showReadMore = descriptionText.length > 150;

  const displayedDescription =
    isDescriptionExpanded || !showReadMore
      ? descriptionText
      : `${descriptionText.substring(0, 150)}...`;

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-[#181818] w-full max-w-7xl h-5/6 overflow-y-auto rounded-lg shadow-xl relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-20"
              aria-label="Close modal"
            >
              <BiX size={32} />
            </button>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 h-full">
              {/* Left Column: Poster and Info */}
              <div className="relative h-full flex flex-col justify-end">
                <div className="absolute inset-0">
                  <Image
                    src={content.imageUrl}
                    alt={content.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="opacity-40 rounded-l-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/80 to-transparent" />
                </div>

                <div className="relative p-6 md:p-10 space-y-4">
                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
                    {content.title}
                  </h1>

                  {/* Buttons */}
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition">
                      <BiPlayCircle size={24} />
                      <span>재생</span>
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
                      <BiPlusCircle size={24} />
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
                      <BiShareAlt size={24} />
                    </button>
                  </div>

                  {/* Basic Info */}
                  <div className="flex items-center space-x-4 text-sm text-gray-300 pt-2">
                    <span>{content.year}</span>
                    <span>2h 15m</span>
                    <span className="flex items-center gap-1 border px-1 rounded">
                      15+
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="p-6 md:p-10 flex flex-col justify-end h-full">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <p className="text-xl text-gray-200">
                      {displayedDescription}
                    </p>
                    {showReadMore && (
                      <button
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className="flex items-center gap-1 text-gray-400 hover:text-white mt-2 text-sm"
                      >
                        <span>
                          {isDescriptionExpanded ? '간략히' : '상세보기'}
                        </span>
                        {isDescriptionExpanded ? (
                          <BiChevronUp />
                        ) : (
                          <BiChevronDown />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Cast */}
                  <div>
                    <h3 className="text-lg text-gray-400">출연진</h3>
                    <p className="text-xl text-gray-200">
                      Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon
                    </p>
                  </div>

                  {/* Genre */}
                  <div>
                    <h3 className="text-lg text-gray-400">장르</h3>
                    <p className="text-xl text-gray-200">{content.genre}</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg text-gray-400">시리즈 특징</h3>
                    <p className="text-xl text-gray-200">
                      Exciting, Mind-bending, Superhero, Action
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieModal;