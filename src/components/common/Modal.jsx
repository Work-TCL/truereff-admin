import React from "react";
import ReactDOM from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[40] sm:w-screen h-screen overflow-hidden flex justify-center items-center">
      <div
        className="block fixed inset-0 bg-black bg-opacity-60 transition-opacity z-1 lg:backdrop-blur-none backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => onClose()}
      ></div>
      <div
        className={`bg-white p-5 relative rounded-lg text-left transition-all w-fit h-fit max-h-[90vh] overflow-hidden flex flex-col ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-gray-700 space-y-4 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
}
