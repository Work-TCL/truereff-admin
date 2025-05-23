import React, { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import Button from "../../common/Button";
import Modal from "../../common/Modal";
import Input from "../../common/Input";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCategory } from "../../../Utils/validations";
import AddEditModel from "./AddEditModel";
import { deleteCategory, getCategory } from "../../../Utils/api";
import { RECORDS_PER_PAGE } from "../../../Utils/common-utils";
import ConfirmModal from "../../common/ConfirmModel";
import { toastMessage } from "../../../Utils/toast-message";

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

const CategoryManagement = () => {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = RECORDS_PER_PAGE;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const paginatedData = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const refreshCentral = async () => {
    try {
      let data = await getCategory({ page: currentPage, limit: rowsPerPage });
      console.log("data", data);
      if (data?.status === 200) {
        data = data?.data;
        const totalPage = Math.ceil((data?.count || 1) / rowsPerPage);
        console.log("totalPage", totalPage);

        setTotalPages(totalPage);
        setCategories(data?.data);
      }
    } catch (error) {
    } finally {
    }
  };
  const handleDelete = async () => {
    try {
      let data = await deleteCategory(isModalOpen);
      console.log("data", data);
      if (data?.status === 200) {
        toastMessage.success(data?.message || "Category Deleted Successfully.");
        setIsModalOpen(null);
        refreshCentral();
        return true;
      }
      throw data;
    } catch (error) {
      toastMessage.error("Failed to Delete Category");
    } finally {
      setIsModalOpen(null);
    }
  };

  useEffect(() => {
    refreshCentral();
  }, [currentPage, rowsPerPage]);

  return (
    <>
      <Button
        onClick={() => {
          setIsNewOpen(true);
        }}
      >
        Add
      </Button>
      <AddEditModel
        category={undefined}
        isOpen={isNewOpen}
        refreshCentral={() => {}}
        setIsOpen={setIsNewOpen}
      />
      <ConfirmModal
        isOpen={Boolean(isModalOpen)}
        onClose={() => setIsModalOpen(null)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this product?"
        confirmText="Yes, I'm sure"
        cancelText="No, cancel"
      />
      <div className="p-6 bg-white shadow rounded-lg">
        {/* <h3 className="text-lg font-semibold mb-4">Latest Transactions</h3> */}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-gray-600 border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">createdAt</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {categories.map((item, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="flex items-center gap-2 py-3">
                    {/* <img src={item.icon} alt="" className="h-6 w-6" /> */}
                    {item.name}
                  </td>
                  {/* <td>{item.date}</td>
                <td>{item.price}</td>
                <td>{item.category}</td> */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusClasses[item.status]
                      }`}
                    >
                      {item?.createdAt &&
                        new Date(item?.createdAt).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <div>
                      {/* <button
                        type="button"
                        class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        edit
                      </button> */}
                      <button
                        onClick={() => {
                          setIsModalOpen(item?._id);
                        }}
                        type="button"
                        class="ml-2 px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CategoryManagement;
