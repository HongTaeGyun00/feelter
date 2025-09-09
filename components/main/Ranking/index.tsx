"use client";
import React, { useState, useEffect } from "react";
import { IoPlayCircleOutline } from "@react-icons/all-files/io5/IoPlayCircleOutline";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoChatbubbleOutline } from "@react-icons/all-files/io5/IoChatbubbleOutline";
import { useMovieStore } from "@/lib/stores";

export default function Ranking() {
  const { movies, loading, fetchMovies } = useMovieStore();
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  const handlePlayClick = () => {
    console.log(`플레이 버튼 클릭: ${selectedMovie.title}`);
    window.open(selectedMovie.streamingUrl, "_blank");
  };

  if (loading) {
    return (
      <section>
        <h2 className="text-lg font-semibold mb-4">인기 순위</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">순위를 불러오는 중...</div>
        </div>
      </section>
    );
  }

  // 상위 10개 영화를 순위로 표시
  const topMovies = movies.slice(0, 10);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">인기 순위</h2>
      <div className="flex gap-6">
        {/* 상세 패널 */}
        <div className="flex-1">
          {selectedMovie ? (
            <DetailsPanel movie={selectedMovie} onPlayClick={handlePlayClick} />
          ) : (
            <div className="bg-gray-100 rounded-lg p-6 h-80 flex items-center justify-center">
              <p className="text-gray-500">영화를 선택해주세요</p>
            </div>
          )}
        </div>

        {/* 순위 리스트 */}
        <div className="w-80">
          <RankingList
            movies={topMovies}
            selectedMovie={selectedMovie}
            onMovieClick={handleMovieClick}
          />
        </div>
      </div>
    </section>
  );
}

// 상세 패널 컴포넌트
function DetailsPanel({
  movie,
  onPlayClick,
}: {
  movie: any;
  onPlayClick: () => void;
}) {
  return (
    <div className="bg-gray-100 rounded-lg p-6 h-80">
      <div className="flex gap-4 h-full">
        {/* 포스터 */}
        <div className="w-32 h-48 bg-gray-300 rounded overflow-hidden flex-shrink-0">
          <img
            src={movie.imgUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 정보 */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <div className="text-sm text-gray-600 mb-4">
            <p>
              {movie.release} • {movie.age} • {movie.runningTime}
            </p>
            <p>
              {movie.genre} • {movie.country}
            </p>
            <p>감독: {movie.director}</p>
            <p>출연: {movie.actor}</p>
          </div>
          <p className="text-sm mb-4 flex-1">{movie.overview}</p>

          {/* 액션 버튼들 */}
          <div className="flex gap-2">
            <button
              onClick={onPlayClick}
              className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              <IoPlayCircleOutline size={16} />
              재생
            </button>
            <button className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
              <IoHeartOutline size={16} />찜
            </button>
            <button className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
              <IoChatbubbleOutline size={16} />
              댓글
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 순위 리스트 컴포넌트
function RankingList({
  movies,
  selectedMovie,
  onMovieClick,
}: {
  movies: any[];
  selectedMovie: any;
  onMovieClick: (movie: any) => void;
}) {
  return (
    <div className="space-y-2">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`flex items-center gap-3 p-3 rounded cursor-pointer transition-colors ${
            selectedMovie?.id === movie.id
              ? "bg-blue-100 border-l-4 border-blue-500"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => onMovieClick(movie)}
        >
          {/* 순위 */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
            {index + 1}
          </div>

          {/* 포스터 */}
          <div className="w-16 h-20 bg-gray-300 rounded overflow-hidden flex-shrink-0">
            <img
              src={
                movie.imgUrl ||
                `https://placehold.co/64x80/333/FFF?text=${
                  movies.indexOf(movie) + 1
                }`
              }
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 정보 */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{movie.title}</h4>
            <p className="text-xs text-gray-600">{movie.genre}</p>
            <p className="text-xs text-gray-500">{movie.streaming}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
