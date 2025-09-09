import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className="px-4 py-2 rounded-lg border border-[#2f3a4a] bg-[#1f2937] text-[#cbd5e1] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`min-w-[36px] h-9 px-2 rounded-lg border border-[#2f3a4a] bg-[#1f2937] text-[#cbd5e1] cursor-pointer ${
            page === currentPage ? "bg-[#334155]" : ""
          } hover:bg-[#334155]`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-4 py-2 rounded-lg border border-[#2f3a4a] bg-[#1f2937] text-[#cbd5e1] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
