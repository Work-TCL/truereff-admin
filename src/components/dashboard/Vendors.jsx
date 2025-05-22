import React, { useState } from "react";
import Pagination from "../common/Pagination";

const transactions = [
  {
    name: "Bought PYPL",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/paypal.svg",
  },
  {
    name: "Bought AAPL",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Pending",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg",
  },
  {
    name: "Sell KKST",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/kickstarter.svg",
  },
  {
    name: "Bought FB",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg",
  },
  {
    name: "Sell AMZN",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Failed",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg",
  },
];

const statusClasses = {
  Success: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Failed: "bg-red-100 text-red-600",
};

const Vendors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const paginatedData = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* <h3 className="text-lg font-semibold mb-4">Latest Transactions</h3> */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-600 border-b">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Date</th>
              <th className="py-2">Price</th>
              <th className="py-2">Category</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {paginatedData.map((item, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="flex items-center gap-2 py-3">
                  <img src={item.icon} alt="" className="h-6 w-6" />
                  {item.name}
                </td>
                <td>{item.date}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  );
};

export default Vendors;
