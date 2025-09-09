// 콘텐츠 데이터 타입 정의
export interface RankingData {
  id: number;
  rank: number;
  title: string;
  year: string;
  age: string;
  genre: string;
  country: string;
  runningtime: string;
  director: string;
  actor: string;
  description: string;
  imageUrl?: string;
  videoUrl: string;
  bestComment: string;
}

// 인기 순위 데이터입니다.
export const popularRankings: RankingData[] = [
  {
    id: 101,
    rank: 1,
    title: "선재 업고 튀어",
    year: "2024",
    age: "15+",
    genre: "로맨스, 판타지",
    country: "대한민국",
    runningtime: "16부작",
    director: "윤종호, 김태엽",
    actor: "변우석, 김혜윤, 송건희",
    description:
      "삶의 의지를 놓아버린 톱스타 류선재와 그를 살리기 위해 과거로 돌아간 열성팬 임솔의 이야기.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/9gEp7Rs43Fi3eEEBsIMc8xGewNp.jpg",
    videoUrl: "https://www.youtube.com/embed/odD0guV_lho",
    bestComment: "매주 월요일이 너무 기다려졌어요ㅠㅠ 인생 드라마!",
  },
  {
    id: 102,
    rank: 2,
    title: "눈물의 여왕",
    year: "2024",
    age: "15+",
    genre: "로맨틱 코미디",
    country: "대한민국",
    runningtime: "16부작",
    director: "장영우, 김희원",
    actor: "김수현, 김지원, 박성훈",
    description:
      "퀸즈 그룹 재벌 3세 홍해인과 용두리 이장 아들 백현우의 아찔한 로맨스.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/3x8GHyMTMsuXVX8pZ1OhUUHgOBx.jpg",
    videoUrl: "https://www.youtube.com/embed/DLhF1MH4T_A",
    bestComment: "김수현 김지원 케미 미쳤다... 눈호강 제대로!",
  },
  {
    id: 103,
    rank: 3,
    title: "범죄도시4",
    year: "2024",
    age: "15+",
    genre: "액션, 코미디",
    country: "대한민국",
    runningtime: "109분",
    director: "허명행",
    actor: "마동석, 김무열, 박지환",
    description: "괴물 형사 마석도가 온라인 불법 도박 조직을 소탕하는 이야기.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/jucHQwnRSma1O9V2bM007e4eSd7.jpg",
    videoUrl: "https://www.youtube.com/embed/pMAPj6WVsT4",
    bestComment: "마동석 형사님은 언제 봐도 믿음직하네요. 통쾌함 그 자체!",
  },
  {
    id: 104,
    rank: 4,
    title: "파묘",
    year: "2024",
    age: "15+",
    genre: "오컬트, 미스터리",
    country: "대한민국",
    runningtime: "134분",
    director: "장재현",
    actor: "최민식, 김고은, 유해진, 이도현",
    description:
      "풍수사, 장의사, 무당들이 거액을 받고 수상한 묘를 이장하며 벌어지는 기이한 이야기.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/tw0i3kkmOTjDjGFZTLHKhoeXVvA.jpg",
    videoUrl: "https://www.youtube.com/embed/_KdKqCTq4DA",
    bestComment: "한국형 오컬트의 새로운 지평을 열었다. 소름 돋는 연기력!",
  },
  {
    id: 105,
    rank: 5,
    title: "시민덕희",
    year: "2024",
    age: "12+",
    genre: "범죄, 드라마",
    country: "대한민국",
    runningtime: "114분",
    director: "박영주",
    actor: "라미란, 공명, 염혜란",
    description:
      "보이스피싱을 당한 평범한 시민 덕희가 직접 사기 조직을 추적하는 이야기.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/hu4nI6znjpdLqcq2SLfLRc3CJOQ.jpg",
    videoUrl: "https://www.youtube.com/embed/w99yyjtYanE",
    bestComment: "실화 바탕이라 더 몰입해서 봤어요. 라미란 배우님 최고!",
  },
  {
    id: 106,
    rank: 6,
    title: "가디언즈 오브 갤럭시: Volume 3",
    year: "2023",
    age: "12+",
    genre: "액션, SF",
    country: "미국",
    runningtime: "150분",
    director: "제임스 건",
    actor: "크리스 프랫, 조 샐다나, 데이브 바티스타",
    description:
      "은하계의 사고뭉치 히어로 가디언즈가 다시 한번 우주를 구하기 위해 나서는 이야기.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/zK0FTsXvkWVS3yubZkbenbAFcnY.jpg",
    videoUrl: "https://www.youtube.com/embed/XyHr-s3MfCQ",
    bestComment: "이 시리즈의 완벽한 마무리. 라쿤 로켓의 서사에 눈물 흘렸네요.",
  },
  {
    id: 107,
    rank: 7,
    title: "아바타: 물의 길",
    year: "2022",
    age: "12+",
    genre: "SF, 액션",
    country: "미국",
    runningtime: "192분",
    director: "제임스 카메론",
    actor: "샘 워싱턴, 조 샐다나, 시고니 위버",
    description: "제이크 설리 가족이 겪는 위기와 생존을 위한 여정.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/u2aVXft5GLBQnjzWVNda7sdDpdu.jpg",
    videoUrl: "https://www.youtube.com/embed/kihrFxwdMb4",
    bestComment: "경이로운 비주얼! 3D로 꼭 봐야 하는 영화입니다.",
  },
  {
    id: 108,
    rank: 8,
    title: "엘리멘탈",
    year: "2023",
    age: "전체관람가",
    genre: "애니메이션, 판타지",
    country: "미국",
    runningtime: "109분",
    director: "피터 손",
    actor: "레아 루이스, 마모두 아티",
    description:
      "불, 물, 공기, 흙 4원소들이 살아가는 도시에서 불의 앰버와 물의 웨이드가 만나 벌어지는 이야기.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/w7eApyAshbepBnDyYRjSeGyRHi2.jpg",
    videoUrl: "https://www.youtube.com/embed/BOqFRHCrN-k",
    bestComment: "눈과 귀가 즐거운 아름다운 이야기. 따뜻한 감동이 남네요.",
  },
  {
    id: 109,
    rank: 9,
    title: "인사이드 아웃 2",
    year: "2024",
    age: "전체관람가",
    genre: "애니메이션, 코미디",
    country: "미국",
    runningtime: "96분",
    director: "켈시 맨",
    actor: "에이미 포엘러, 마야 호크",
    description:
      "사춘기에 접어든 라일리의 머릿속 감정 컨트롤 본부에 새로운 감정들이 등장하며 벌어지는 이야기.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/x2BHx02jMbvpKjMvbf8XxJkYwHJ.jpg",
    videoUrl: "https://www.youtube.com/embed/EiCmnIaj4u8",
    bestComment: "불안이가 이렇게 귀여울 줄이야! 공감 100% 스토리.",
  },
  {
    id: 110,
    rank: 10,
    title: "퓨리오사: 매드맥스 사가",
    year: "2024",
    age: "15+",
    genre: "액션, SF",
    country: "호주, 미국",
    runningtime: "148분",
    director: "조지 밀러",
    actor: "안야 테일러 조이, 크리스 헴스워스",
    description:
      "황폐해진 세상 속, 납치된 퓨리오사가 고향으로 돌아가기 위해 벌이는 사투를 그린 이야기.",
    imageUrl:
      "https://www.themoviedb.org/t/p/w1280/zaUFDdJidS4Nyyd6jb2Ok3Kq4Vo.jpg",
    videoUrl: "https://www.youtube.com/embed/NXHOhQOCB6g",
    bestComment: "퓨리오사 캐릭터가 더 멋있게 느껴졌어요. 시원한 액션 최고!",
  },
];
