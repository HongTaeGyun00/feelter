"use client";

import Image from "next/image";

export default function Home() {
  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(
      "서비스 페이지로 이동합니다! (30초 설문을 통해 취향 맞춤 추천을 받아보세요!)"
    );
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0] flex flex-col pt-20">
      <header className="hero-section relative bg-gradient-to-b from-black/70 to-black/90 bg-cover bg-center text-white py-32 px-5 text-center overflow-hidden shadow-inner">
        <div className="hero-content max-w-5xl mx-auto">
          <h1 className="text-7xl mb-6 font-black leading-tight tracking-wide">
            이제는, 뭘 봐야 할지 모르겠다면?
          </h1>
          <p className="text-3xl font-normal mb-16 text-[#ccff00] leading-relaxed">
            OTT 파워유저라면 한 번쯤 느꼈을 거예요.
            <br />
            매일 신작을 찾아도, 더 이상 놀랍지 않을 때.
          </p>
          <div className="main-message text-2xl mb-12 max-w-4xl mx-auto leading-loose">
            <h3 className="mb-8">당신의 지금, 그 순간에 필요한 콘텐츠!</h3>
            <button
              onClick={handleStartClick}
              className="inline-block bg-[#ccff00] text-black py-5 px-12 text-2xl font-bold rounded transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1 mt-10"
            >
              지금 바로 보러가기
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section
          id="problem"
          className="section bg-[#111] py-24 px-5 text-center"
        >
          <h2 className="text-5xl text-white mb-12 font-bold tracking-wide">
            혹시 이런 고민 해보셨나요?
          </h2>
          <div className="problem-list flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
            <div className="problem-item bg-[#222] rounded-lg p-12 flex-1 min-w-[300px] max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08]">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-10">
                <Image
                  src="/img/icon-frustrated.png"
                  alt="고민하는 이모티콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-lg text-[#e0e0e0]">
                뭘 봐야 할지 모르겠어... 콘텐츠만 찾다 시간 다 보냈네.
              </p>
            </div>
            <div className="problem-item bg-[#222] rounded-lg p-12 flex-1 min-w-[300px] max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08]">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-10">
                <Image
                  src="/img/icon-money.png"
                  alt="돈 이모티콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-lg text-[#e0e0e0]">
                어떤 OTT에 있는지 몰라 불필요하게 여러 개 구독 중이야.
              </p>
            </div>
            <div className="problem-item bg-[#222] rounded-lg p-12 flex-1 min-w-[300px] max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08]">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-10">
                <Image
                  src="/img/icon-shrug.png"
                  alt="모르겠는 이모티콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-lg text-[#e0e0e0]">
                매번 보던 것만 보고, 새로운 취향은 찾기 어려워.
              </p>
            </div>
          </div>
        </section>

        <section
          id="value"
          className="section bg-[#0c0c0c] text-white py-24 px-5 text-center"
        >
          <h2 className="text-5xl mb-12 font-bold tracking-wide">
            &apos;Feelter&apos;만의 특별한 솔루션
          </h2>
          <div className="value-propositions flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
            <div className="value-item bg-[#222] border border-white/[0.08] rounded-lg p-12 flex-1 min-w-[300px] max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-ai.png"
                  alt="아이디어 전구"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-3xl text-white mb-5">상황별 맞춤 추천</h3>
              <p className="text-lg text-[#e0e0e0]">
                사용자님의 상황에 맞는 감성 콘텐츠를 찾아드려요.
              </p>
            </div>
            <div className="value-item bg-[#222] border border-white/[0.08] rounded-lg p-12 flex-1 min-w-[300px] max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-globe.png"
                  alt="지구본 아이콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-3xl text-white mb-5">통합 콘텐츠 검색</h3>
              <p className="text-lg text-[#e0e0e0]">
                넷플릭스, 티빙, 웨이브 등 모든 OTT 콘텐츠를 한 번에 검색하고
                위치를 확인하세요.
              </p>
            </div>
            <div className="value-item bg-[#222] border border-white/[0.08] rounded-lg p-12 flex-1 min-w-[300px] max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-community.png"
                  alt="손 잡은 아이콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-3xl text-white mb-5">사용자 커뮤니티</h3>
              <p className="text-lg text-[#e0e0e0]">
                리뷰와 평점을 공유하고, 다른 사용자들과 소통하며 시청 경험을
                풍성하게 만드세요.
              </p>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="section bg-[#111] py-24 px-5 text-center"
        >
          <h2 className="text-5xl mb-12 font-bold tracking-wide text-white">
            스마트한 시청 경험을 위한 주요 기능
          </h2>
          <div className="feature-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 max-w-6xl mx-auto">
            <div className="feature-item bg-[#222] rounded-lg p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08] w-full max-w-[380px] mx-auto">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-search.png"
                  alt="검색 돋보기"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl text-white mb-4">통합 검색 기능</h3>
              <p className="text-lg text-[#e0e0e0]">
                수많은 OTT 플랫폼의 콘텐츠를 하나의 검색창에서 빠르고 정확하게
                찾아냅니다.
              </p>
            </div>
            <div className="feature-item bg-[#222] rounded-lg p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08] w-full max-w-[380px] mx-auto">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-survey.png"
                  alt="설문지 아이콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl text-white mb-4">간단 취향 설문</h3>
              <p className="text-lg text-[#e0e0e0]">
                첫 방문 시 간단한 설문으로 사용자님의 취향을 파악하고 최적의
                추천을 시작합니다.
              </p>
            </div>
            <div className="feature-item bg-[#222] rounded-lg p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08] w-full max-w-[380px] mx-auto">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-heart.png"
                  alt="하트 아이콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl text-white mb-4">개인 맞춤 추천</h3>
              <p className="text-lg text-[#e0e0e0]">
                선호도를 기반으로 사용자님께 꼭 맞는 작품을 추천해 드려요.
              </p>
            </div>
            <div className="feature-item bg-[#222] rounded-lg p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08] w-full max-w-[380px] mx-auto">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-pin.png"
                  alt="핀 아이콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl text-white mb-4">테마별 큐레이션</h3>
              <p className="text-lg text-[#e0e0e0]">
                요일, 날씨, 기분에 따라 달라지는 특별한 테마의 콘텐츠를
                만나보세요.
              </p>
            </div>
            <div className="feature-item bg-[#222] rounded-lg p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08] w-full max-w-[380px] mx-auto">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-chart.png"
                  alt="차트 아이콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl text-white mb-4">실시간 트렌드 차트</h3>
              <p className="text-lg text-[#e0e0e0]">
                지금 가장 뜨는 콘텐츠는 무엇일까? 인기 순위로 최신 흐름을 놓치지
                마세요.
              </p>
            </div>
            <div className="feature-item bg-[#222] rounded-lg p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/[0.08] w-full max-w-[380px] mx-auto">
              <div className="icon w-36 h-36 flex justify-center items-center mx-auto mb-9">
                <Image
                  src="/img/icon-chat.png"
                  alt="말풍선 아이콘"
                  width={144}
                  height={144}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl text-white mb-4">활발한 커뮤니티</h3>
              <p className="text-lg text-[#e0e0e0]">
                콘텐츠 리뷰, 평점 공유, 자유로운 토론을 통해 시청의 즐거움을
                더하세요.
              </p>
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="section bg-[#0c0c0c] py-24 px-5 text-white text-center"
        >
          <h2 className="text-5xl mb-12 font-bold">
            지금 바로 &apos;Feelter&apos;를 시작하세요!
          </h2>
          <button
            onClick={handleStartClick}
            className="inline-block bg-[#ccff00] text-black py-5 px-12 text-3xl font-bold rounded transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1 mb-6"
          >
            무료로 시작하기
          </button>
          <p className="text-base text-[#aaa]">
            개인의 취향을 담은 스마트한 콘텐츠 라이프, &apos;Feelter&apos;와
            함께!
          </p>
        </section>
      </main>

      <footer className="bg-[#080808] text-[#777] text-center py-8 px-5 text-sm border-t border-white/[0.05]">
        <p className="mb-1 leading-relaxed">
          고객센터 &nbsp;|&nbsp; 이용약관 &nbsp;|&nbsp; 개인정보처리방침
        </p>
        <p className="mb-1 leading-relaxed">
          &copy; 2025 Feelter. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
