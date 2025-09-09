import { NextRequest, NextResponse } from "next/server";
import { movieService, movieRankingService } from "@/lib/services/movieService";

// 목업 영화 데이터
const mockMovies = [
  {
    id: "1",
    title: "오징어 게임 시즌 3",
    release: "2025-01-01",
    age: "19+",
    genre: "드라마, 스릴러",
    runningTime: "7부작",
    country: "대한민국",
    director: "황동혁",
    actor: "이정재, 이병헌, 임시완, 강하늘, 위하준",
    overview:
      "빚에 허덕이는 사람들이 목숨을 걸고 게임에 뛰어드는 이야기. 충격적인 반전과 강렬한 서스펜스.",
    streaming: "Netflix",
    streamingUrl: "https://www.netflix.com/title/81040344",
    youtubeUrl: "https://www.youtube.com/embed/Y9E0S0r_Elg",
    imgUrl:
      "https://media.themoviedb.org/t/p/w260_and_h390_bestv2/mvJu1zWa2o7isoWwa5E9TBLR2ab.jpg",
    bgUrl:
      "https://media.themoviedb.org/t/p/w1280/mvJu1zWa2o7isoWwa5E9TBLR2ab.jpg",
    feelterTime: "저녁",
    feelterPurpose: "긴장감",
    feelterOccasion: "혼자",
  },
  {
    id: "2",
    title: "더 글로리",
    release: "2025-01-01",
    age: "19+",
    genre: "드라마, 스릴러",
    runningTime: "16부작",
    country: "대한민국",
    director: "안길호",
    actor: "송혜교, 이도현, 임지연, 염혜란, 박성훈",
    overview:
      "학교 폭력으로 영혼까지 부서진 한 여자가 삶을 건 복수를 시작하는 이야기.",
    streaming: "Netflix",
    streamingUrl: "https://www.netflix.com/title/81443047",
    youtubeUrl: "https://www.youtube.com/embed/dOp0oWFHUWw",
    imgUrl:
      "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/wBfI2ky2ExQKhEegte0G1Kijpmd.jpg",
    bgUrl:
      "https://media.themoviedb.org/t/p/w1280/wBfI2ky2ExQKhEegte0G1Kijpmd.jpg",
    feelterTime: "밤",
    feelterPurpose: "복수",
    feelterOccasion: "혼자",
  },
  {
    id: "3",
    title: "무빙",
    release: "2023-01-01",
    age: "19+",
    genre: "액션, SF",
    runningTime: "20부작",
    country: "대한민국",
    director: "박인제, 박윤서",
    actor: "류승룡, 한효주, 조인성, 차태현, 류승범, 김성균",
    overview:
      "초능력을 숨긴 채 현재를 살아가는 아이들과 과거의 비밀을 숨긴 채 살아온 부모들의 이야기.",
    streaming: "Disney+",
    streamingUrl: "https://www.disneyplus.com/ko-kr/series/moving/",
    youtubeUrl: "https://www.youtube.com/embed/9V2tVurYTxc",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/b9MhD5syJ7TbYSeje4wB4oyTzc7.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/b9MhD5syJ7TbYSeje4wB4oyTzc7.jpg",
    feelterTime: "저녁",
    feelterPurpose: "액션",
    feelterOccasion: "가족",
  },
  {
    id: "4",
    title: "피라미드 게임",
    release: "2024-01-01",
    age: "19+",
    genre: "스릴러",
    runningTime: "10부작",
    country: "대한민국",
    director: "박소연",
    actor: "김지연, 류데빈, 강나영, 신은수",
    overview:
      "한 달에 한 번 비밀 투표로 왕따를 뽑는 백연여자고등학교. 투표가 지배하는 세상에서 벌어지는 게임에 전학생이 합류합니다.",
    streaming: "Tving",
    streamingUrl: "https://www.tving.com/contents/P001924456",
    youtubeUrl: "https://www.youtube.com/embed/Q43bi242QYs",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/8QEpP4ChnziSr1nFxRzvIX69OaI.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/8QEpP4ChnziSr1nFxRzvIX69OaI.jpg",
    feelterTime: "밤",
    feelterPurpose: "긴장감",
    feelterOccasion: "혼자",
  },
  {
    id: "5",
    title: "범죄도시4",
    release: "2024-01-01",
    age: "15+",
    genre: "액션",
    runningTime: "109분",
    country: "대한민국",
    director: "허명행",
    actor: "마동석, 김무열, 박지환, 이동휘, 이범수",
    overview: "괴물 형사 마석도가 신종 범죄를 소탕하기 위해 나서는 이야기.",
    streaming: "Netflix",
    streamingUrl: "https://www.netflix.com/title/81669977",
    youtubeUrl: "https://www.youtube.com/embed/Ninhkg7Jh48",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/jucHQwnRSma1O9V2bM007e4eSd7.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/jucHQwnRSma1O9V2bM007e4eSd7.jpg",
    feelterTime: "저녁",
    feelterPurpose: "액션",
    feelterOccasion: "친구",
  },
  {
    id: "6",
    title: "파묘",
    release: "2024-01-01",
    age: "15+",
    genre: "미스터리, 공포",
    runningTime: "134분",
    country: "대한민국",
    director: "장재현",
    actor: "최민식, 김고은, 유해진, 이도현, 김재철",
    overview:
      "수상한 묘를 이장하며 기이한 사건에 휘말리는 풍수사와 장의사, 무당들의 이야기.",
    streaming: "Netflix",
    streamingUrl: "https://www.netflix.com/title/81669977",
    youtubeUrl: "https://www.youtube.com/embed/rjW9E1BR_30",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/tw0i3kkmOTjDjGFZTLHKhoeXVvA.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/tw0i3kkmOTjDjGFZTLHKhoeXVvA.jpg",
    feelterTime: "밤",
    feelterPurpose: "공포",
    feelterOccasion: "혼자",
  },
];

export async function POST(request: NextRequest) {
  try {
    console.log("영화 데이터를 Firebase에 입력하는 중...");

    // 배치로 영화 데이터 추가
    await movieService.addMoviesBatch(mockMovies);

    console.log("✅ 영화 데이터 입력 완료!");

    // 입력된 영화 목록 확인
    const movies = await movieService.getAllMovies();
    console.log(`총 ${movies.length}개의 영화가 입력되었습니다.`);

    // 영화 순위 데이터도 추가
    const rankings = movies.slice(0, 10).map((movie, index) => ({
      rank: index + 1,
      movieId: movie.id,
      bestComment: `${movie.title} 정말 재미있어요!`,
    }));

    await movieRankingService.addRankingsBatch(rankings);
    console.log("✅ 영화 순위 데이터 입력 완료!");

    return NextResponse.json({
      success: true,
      message: "영화 데이터가 성공적으로 입력되었습니다.",
      moviesCount: movies.length,
      rankingsCount: rankings.length,
    });
  } catch (error) {
    console.error("❌ 영화 데이터 입력 중 오류 발생:", error);
    return NextResponse.json(
      {
        success: false,
        message: "영화 데이터 입력 중 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const movies = await movieService.getAllMovies();
    return NextResponse.json({
      success: true,
      moviesCount: movies.length,
      movies: movies.slice(0, 5), // 처음 5개만 반환
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "영화 데이터를 불러오는 중 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}
