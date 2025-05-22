import { ChevronLeft,ChevronRight } from "lucide-react";
import React from "react";


export default function Pagination({currentPage, totalPages, handlePageChange}){
    return (
        <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 text-sm flex gap-2 border rounded hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} /> Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-full text-sm ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 flex gap-2 text-sm border rounded hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    );
}