import Link from "next/link";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#333] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-around pb-6">
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-4">회사 정보</h4>
            <ul>
              <li>
                <Link href="#" className="block mb-2 text-sm hover:underline">
                  서비스소개
                </Link>
              </li>
              <li>
                <Link href="#" className="block mb-2 text-sm hover:underline">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-lg mb-4">고객센터</h4>
            <p className="text-sm">이메일: support@feelter.com</p>
            <p className="text-sm">전화: 1588-1234</p>
            <p className="text-sm">운영시간: 평일 09:00~18:00</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">소셜 미디어</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="트위터">
                <BsTwitter size={24} />
              </Link>
              <Link href="#" aria-label="페이스북">
                <BsFacebook size={24} />
              </Link>
              <Link href="#" aria-label="인스타그램">
                <BsInstagram size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center border-t border-[#333] pt-6">
          <p className="text-sm">© 2025 Feelter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
