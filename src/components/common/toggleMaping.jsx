import React from "react";
import { useSearchParams } from "react-router-dom";

export default function ToggleMaping() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isMapping = searchParams.get("isMap") === "true";

  const toggleView = () => {
    if (isMapping) {
      searchParams.delete("isMap");
    } else {
      searchParams.set("isMap", "true");
    }
    setSearchParams(searchParams);
  };
  return (
    <div className="flex justify-end items-center gap-3">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isMapping}
          onChange={toggleView}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition duration-300"></div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform duration-300"></div>
      </label>
      <span className="text-sm font-medium text-gray-700">{isMapping ? "Mapping View":"Category View"}</span>
    </div>
  );
}
