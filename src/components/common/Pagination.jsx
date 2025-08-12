import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
  range = 1,
}) {
  const getPages = () => {
    if (totalPages <= range * 2 + 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let pages = [1];

    // Left ellipsis
    if (currentPage - range > 2) {
      pages.push("...");
    } else {
      for (let i = 2; i < currentPage; i++) {
        pages.push(i);
      }
    }

    // Middle
    for (
      let i = Math.max(2, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    // Right ellipsis
    if (currentPage + range < totalPages - 1) {
      pages.push("...");
    } else {
      for (let i = currentPage + 1; i < totalPages; i++) {
        pages.push(i);
      }
    }

    pages.push(totalPages);

    return [...new Set(pages)];
  };

  return (
    <div className="mt-4 flex justify-center items-center relative z-10">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="p-2 flex items-center border rounded hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mx-2">
        {getPages().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-gray-500 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 text-sm flex items-center justify-center rounded-full ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="p-2 flex items-center border rounded hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
