import {
  movieService,
  movieRankingService,
} from "../lib/services/movieService";
import { Movie } from "../lib/types/movie";

// 목업 영화 데이터
const mockMovies: Omit<Movie, "id" | "createdAt" | "updatedAt">[] = [
  {
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
    title: "살인자ㅇ난감",
    release: "2024-01-01",
    age: "19+",
    genre: "드라마, 스릴러",
    runningTime: "8부작",
    country: "대한민국",
    director: "이창희",
    actor: "최우식, 손석구, 이희준",
    overview:
      "우발적인 살인 후 자신에게 타인을 구원할 능력이 있음을 깨닫는 남자의 이야기.",
    streaming: "Netflix",
    streamingUrl: "https://www.netflix.com/title/81669977",
    youtubeUrl: "https://www.youtube.com/embed/YiRAfZl7owU",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/e1HOt09BgYH5oZ8xfgi8TQiReYR.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/e1HOt09BgYH5oZ8xfgi8TQiReYR.jpg",
    feelterTime: "밤",
    feelterPurpose: "긴장감",
    feelterOccasion: "혼자",
  },
  {
    title: "시민덕희",
    release: "2024-01-01",
    age: "15+",
    genre: "드라마",
    runningTime: "114분",
    country: "대한민국",
    director: "박영주",
    actor: "라미란, 공명, 염혜란, 박병은, 장윤주",
    overview: "보이스피싱을 당한 평범한 시민이 직접 조직을 추적하는 이야기.",
    streaming: "Netflix",
    streamingUrl: "https://www.netflix.com/title/81669977",
    youtubeUrl: "https://www.youtube.com/embed/w99yyjtYanE",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/hu4nI6znjpdLqcq2SLfLRc3CJOQ.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/hu4nI6znjpdLqcq2SLfLRc3CJOQ.jpg",
    feelterTime: "오후",
    feelterPurpose: "감동",
    feelterOccasion: "가족",
  },
  {
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
  {
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
    title: "로키 시즌2",
    release: "2023-01-01",
    age: "15+",
    genre: "SF",
    runningTime: "6부작",
    country: "미국",
    director: "저스틴 벤슨, 아론 무어헤드",
    actor: "톰 히들스턴, 오웬 윌슨, 소피아 디 마티노, 구구 바샤로",
    overview:
      "토르의 동생 로키가 TVA에 잡혀가면서 시공간을 넘나드는 모험을 겪는 이야기.",
    streaming: "Disney+",
    streamingUrl: "https://www.disneyplus.com/ko-kr/series/loki/",
    youtubeUrl: "https://www.youtube.com/embed/sRtVv44V4vI",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/eSdTAyGeqZsQHezhdsCildVzrdK.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/eSdTAyGeqZsQHezhdsCildVzrdK.jpg",
    feelterTime: "저녁",
    feelterPurpose: "모험",
    feelterOccasion: "혼자",
  },
  {
    title: "카지노",
    release: "2023-01-01",
    age: "19+",
    genre: "스릴러",
    runningTime: "8부작",
    country: "대한민국",
    director: "강윤성",
    actor: "최민식, 손석구, 이동휘, 홍기준, 허성태, 이혜영",
    overview:
      "우여곡절 끝에 카지노의 왕이 된 남자, 그의 인생에 드리운 거대한 사건들의 이야기.",
    streaming: "Disney+",
    streamingUrl: "https://www.disneyplus.com/ko-kr/series/casino/",
    youtubeUrl: "https://www.youtube.com/embed/-uFz1u6W8uM",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/b7wLXWOdeyz3gWnfN5h9OI3cb4o.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/b7wLXWOdeyz3gWnfN5h9OI3cb4o.jpg",
    feelterTime: "밤",
    feelterPurpose: "긴장감",
    feelterOccasion: "혼자",
  },
  {
    title: "만달로리안 시즌3",
    release: "2023-01-01",
    age: "15+",
    genre: "SF",
    runningTime: "8부작",
    country: "미국",
    director: "릭 파미아, 칼 웨더스, 정이삭",
    actor: "페드로 파스, 칼 웨더스",
    overview:
      "제국이 몰락한 후, 신비로운 전사와 베이비 요다가 우주를 여행하는 이야기.",
    streaming: "Disney+",
    streamingUrl: "https://www.disneyplus.com/ko-kr/series/the-mandalorian/",
    youtubeUrl: "https://www.youtube.com/embed/8j6MpLHWU8M",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/9wOTABT35GsYNHtmFnxbRYN9d24.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/9wOTABT35GsYNHtmFnxbRYN9d24.jpg",
    feelterTime: "저녁",
    feelterPurpose: "모험",
    feelterOccasion: "가족",
  },
  {
    title: "아바타:물의 길",
    release: "2022-01-01",
    age: "12+",
    genre: "밀리터리 SF",
    runningTime: "192분",
    country: "미국",
    director: "제임스 카메론",
    actor: "샘 워딩턴, 조 샐다나, 시고니 위버",
    overview: "외계 행성 판도라를 탐사하는 전직 해병대원 제이크 설리의 이야기.",
    streaming: "Disney+",
    streamingUrl:
      "https://www.disneyplus.com/ko-kr/movies/avatar-the-way-of-water/",
    youtubeUrl: "https://www.youtube.com/embed/kihrFxwdMb4",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/u2aVXft5GLBQnjzWVNda7sdDpdu.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/u2aVXft5GLBQnjzWVNda7sdDpdu.jpg",
    feelterTime: "저녁",
    feelterPurpose: "모험",
    feelterOccasion: "가족",
  },
  {
    title: "인사이드 아웃 2",
    release: "2024-01-01",
    age: "전체",
    genre: "애니메이션",
    runningTime: "96분",
    country: "미국",
    director: "켈시 맨",
    actor: "에이미 포엘러, 마야 호크, 루이스 블랙, 필리스 스미스, 토니 헤일",
    overview:
      "소녀 라일리의 감정 컨트롤 본부에서 벌어지는 기쁨, 슬픔, 버럭, 까칠, 소심이의 이야기.",
    streaming: "Disney+",
    streamingUrl: "https://www.disneyplus.com/ko-kr/movies/inside-out-2/",
    youtubeUrl: "https://www.youtube.com/embed/EiCmnIaj4u8",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/x2BHx02jMbvpKjMvbf8XxJkYwHJ.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/x2BHx02jMbvpKjMvbf8XxJkYwHJ.jpg",
    feelterTime: "오후",
    feelterPurpose: "감동",
    feelterOccasion: "가족",
  },
  {
    title: "겨울왕국 2",
    release: "2019-01-01",
    age: "전체",
    genre: "애니메이션",
    runningTime: "103분",
    country: "미국",
    director: "크리스 벅",
    actor: "제니퍼 리, 크리스틴 벨, 이디나 멘젤, 조시 게드, 조나단 그로프",
    overview:
      "모든 것을 얼려버리는 힘을 가진 언니 엘사와, 그런 언니를 구하려는 동생 안나의 이야기.",
    streaming: "Disney+",
    streamingUrl: "https://www.disneyplus.com/ko-kr/movies/frozen-2/",
    youtubeUrl: "https://www.youtube.com/embed/eSEs4B4H-EA",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/nPwt7cv4eeUeI0t7CuWm3BctetO.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/nPwt7cv4eeUeI0t7CuWm3BctetO.jpg",
    feelterTime: "오후",
    feelterPurpose: "감동",
    feelterOccasion: "가족",
  },
  {
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
    title: "환승연애, 또 다른 시작",
    release: "2024-01-01",
    age: "15+",
    genre: "로맨스",
    runningTime: "12부작",
    country: "대한민국",
    director: "이진호",
    actor: "이진호, 김지연, 박민수",
    overview: "헤어진 연인들이 다시 만나 사랑을 찾아가는 이야기.",
    streaming: "Tving",
    streamingUrl: "https://www.tving.com/contents/P001924456",
    youtubeUrl: "https://www.youtube.com/embed/4G2izaw02pI",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/6wUDsNQHvKtaettKHHHE6uFOZCq.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/6wUDsNQHvKtaettKHHHE6uFOZCq.jpg",
    feelterTime: "저녁",
    feelterPurpose: "로맨스",
    feelterOccasion: "연인",
  },
  {
    title: "LTNS",
    release: "2024-01-01",
    age: "19+",
    genre: "로맨스, 코미디",
    runningTime: "6부작",
    country: "대한민국",
    director: "김민석",
    actor: "이솜, 안재홍",
    overview:
      "결혼 7년 차 부부가 관계 회복을 위해 불륜 커플의 뒤를 쫓으며 벌어지는 이야기.",
    streaming: "Tving",
    streamingUrl: "https://www.tving.com/contents/P001924456",
    youtubeUrl: "https://www.youtube.com/embed/vh7yeXuY59w",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/f71Tlsx9bl3UZvWqFynSpa7nGcl.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/f71Tlsx9bl3UZvWqFynSpa7nGcl.jpg",
    feelterTime: "저녁",
    feelterPurpose: "로맨스",
    feelterOccasion: "연인",
  },
  {
    title: "유미의 세포들",
    release: "2021-01-01",
    age: "15+",
    genre: "로맨스, 코미디",
    runningTime: "14부작",
    country: "대한민국",
    director: "이상엽",
    actor: "김고은, 안보현, 이유빈, 박지현",
    overview:
      "평범한 직장인 유미의 연애와 일상을 머릿속 세포들의 시선으로 그려낸 이야기.",
    streaming: "Tving",
    streamingUrl: "https://www.tving.com/contents/P001924456",
    youtubeUrl: "https://www.youtube.com/embed/Uld-205xOdo",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/tFs3zEL2FYaq2S0vyVyq6xWsly4.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/tFs3zEL2FYaq2S0vyVyq6xWsly4.jpg",
    feelterTime: "저녁",
    feelterPurpose: "로맨스",
    feelterOccasion: "혼자",
  },
  {
    title: "솔로동창회 학연",
    release: "2024-01-01",
    age: "15+",
    genre: "로맨스, 코미디",
    runningTime: "8부작",
    country: "대한민국",
    director: "박민수",
    actor: "김지연, 박민수, 이진호",
    overview:
      "설레는 만남부터 거침없는 솔직함까지, 학창 시절 친구들의 현실 로맨스 이야기.",
    streaming: "Tving",
    streamingUrl: "https://www.tving.com/contents/P001924456",
    youtubeUrl: "https://www.youtube.com/embed/x9S26D4bVbA",
    imgUrl:
      "https://www.themoviedb.org/t/p/w1280/bzmObEUcf5toPxtPWGABPSH9kDQ.jpg",
    bgUrl:
      "https://www.themoviedb.org/t/p/w1280/bzmObEUcf5toPxtPWGABPSH9kDQ.jpg",
    feelterTime: "저녁",
    feelterPurpose: "로맨스",
    feelterOccasion: "친구",
  },
];

// 영화 데이터를 Firebase에 입력하는 함수
async function seedMovies() {
  try {
    console.log("영화 데이터를 Firebase에 입력하는 중...");

    // 기존 데이터 삭제 (선택사항)
    // const existingMovies = await movieService.getAllMovies();
    // for (const movie of existingMovies) {
    //   await movieService.deleteMovie(movie.id);
    // }

    // 배치로 영화 데이터 추가
    await movieService.addMoviesBatch(mockMovies);

    console.log("✅ 영화 데이터 입력 완료!");

    // 입력된 영화 목록 확인
    const movies = await movieService.getAllMovies();
    console.log(`총 ${movies.length}개의 영화가 입력되었습니다.`);

    // 영화 순위 데이터도 추가 (선택사항)
    const rankings = movies.slice(0, 10).map((movie, index) => ({
      rank: index + 1,
      movieId: movie.id,
      bestComment: `${movie.title} 정말 재미있어요!`,
    }));

    await movieRankingService.addRankingsBatch(rankings);
    console.log("✅ 영화 순위 데이터 입력 완료!");
  } catch (error) {
    console.error("❌ 영화 데이터 입력 중 오류 발생:", error);
  }
}

// 스크립트 실행
if (require.main === module) {
  seedMovies();
}

export { seedMovies };
