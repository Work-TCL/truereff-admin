import React from "react";
import { FileText } from "lucide-react"; // Optional icon lib

const TablePlaceholder = ({ message = "No data available", icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
      <div className="mb-3 text-blue-600">{icon || <FileText size={48} />}</div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default TablePlaceholder;
