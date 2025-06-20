import React from "react";

function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      class={`ml-auto flex gap-x-2 items-center w-fit focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
