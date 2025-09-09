export const GENRES = [
  "SF",
  "스릴러",
  "드라마",
  "액션",
  "어드벤처",
  "로맨스",
  "뮤지컬",
  "코미디",
  "호러",
  "애니메이션",
  "다큐멘터리",
  "범죄",
  "미스터리",
  "판타지",
] as const;

export const DIRECTORS = [
  "크리스토퍼 놀란",
  "봉준호",
  "데미언 차젤",
  "안토니 루소",
  "제임스 카메론",
  "데니스 빌럼브",
  "쿠엔틴 타란티노",
  "마틴 스코세이지",
  "스티븐 스필버그",
  "박찬욱",
] as const;

export type Genre = (typeof GENRES)[number];
export type Director = (typeof DIRECTORS)[number];
