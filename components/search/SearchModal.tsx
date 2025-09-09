import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import ContentCard from "./ContentCard";
import { ContentItem } from "@/lib/data";
import { IoCloseOutline } from "react-icons/io5";

const DEBOUNCE_DELAY = 300;
const PLACEHOLDER_TEXT = "검색어를 입력하세요...";
const NO_RESULTS_TEXT = "검색 결과가 없습니다.";
const CLOSE_BUTTON_ARIA_LABEL = "검색 닫기";
const MODAL_TITLE_ID = "search-modal-title";
const MODAL_TITLE = "콘텐츠 검색";
const ICON_SIZE = 28;

interface SearchModalProps {
  onClose: () => void;
  content: ContentItem[];
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, content }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    inputRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const filteredContent = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) {
      return content;
    }
    return content.filter((item) => item.title.toLowerCase().includes(q));
  }, [debouncedQuery, content]);

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[1100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={MODAL_TITLE_ID}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1200px,94%)] bg-[#0f172a] border border-[#2f3a4a] rounded-2xl p-6 shadow-2xl"
        onClick={handleModalContentClick}
      >
        <h2 id={MODAL_TITLE_ID} className="sr-only">
          {MODAL_TITLE}
        </h2>
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full border border-[#2f3a4a] bg-[#1f2937] text-[#cbd5e1] cursor-pointer"
          aria-label={CLOSE_BUTTON_ARIA_LABEL}
          onClick={onClose}
        >
          <IoCloseOutline size={ICON_SIZE} className="mx-auto" />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder={PLACEHOLDER_TEXT}
          className="w-full px-5 py-4 rounded-xl border border-[#2f3a4a] bg-[#111827] text-[#e5e7eb] text-lg placeholder:text-[#9aa4b2] focus:outline-none"
          value={query}
          onChange={handleQueryChange}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4 max-h-[65vh] overflow-y-auto">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <ContentCard key={item.title} content={item} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              {NO_RESULTS_TEXT}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SearchModal);
