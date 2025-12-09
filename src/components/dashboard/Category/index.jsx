import React, { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import Button from "../../common/Button";
import AddEditModel from "./AddEditModel";
import { deleteCategory, getCategory } from "../../../Utils/api";
import { RECORDS_PER_PAGE } from "../../../Utils/common-utils";
import ConfirmModal from "../../common/ConfirmModel";
import { toastMessage } from "../../../Utils/toast-message";
import DynamicTable from "../../common/table";
import ToggleMaping from "../../common/toggleMaping";

const CategoryManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = RECORDS_PER_PAGE;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const refreshCentral = async () => {
    setIsLoading(true);
    try {
      let response = await getCategory({
        page: currentPage,
        limit: rowsPerPage,
      });
      if (response?.status === 200) {
        const data = response?.data;
        const totalPage = Math.ceil((data?.count || 1) / rowsPerPage);

        setTotalPages(totalPage);
        setCategories(data?.data);
      }
    } catch (error) {
      console.log("while fetching category");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    setIsDelLoading(true);
    try {
      let data = await deleteCategory(isModalOpen);
      if (data?.status === 200) {
        toastMessage.success(data?.message || "Category Deleted Successfully.");
        setIsModalOpen(null);
        refreshCentral();
        return true;
      }
      throw data;
    } catch (error) {
      console.log("error", error?.response?.data?.message);

      toastMessage.error(
        error?.response?.data?.message || "Failed to Delete Category"
      );
    } finally {
      setIsModalOpen(null);
      setIsDelLoading(false);
    }
  };

  useEffect(() => {
    refreshCentral();
    // eslint-disable-next-line
  }, [currentPage, rowsPerPage]);

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Parent Name",
      accessor: "parentId",
      render: (value) => {
        return value ? value?.name : "-";
      },
    },
    {
      header: "Type",
      accessor: "type",
      render: (value) => {
        return value ? value : "-";
      },
    },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (value) =>
        value ? (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
            {new Date(value).toLocaleString()}
          </span>
        ) : (
          "-"
        ),
    },
  ];

  const actions = [
    {
      label: "Delete",
      onClick: (item) => setIsModalOpen(item._id),
      className:
        "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 focus:ring-red-300",
    },
  ];

  return (
    <div className="relative h-full overflow-hidden flex flex-col w-full p-4">
      {isLoading ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 text-white flex justify-center items-center z-20">
          Loading...
        </div>
      ) : null}
      <div className="flex justify-end items-center gap-2 md:gap-5 mb-2">
        <ToggleMaping />
        <Button
        className="mb-0"
          onClick={() => {
            setIsNewOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <AddEditModel
        category={undefined}
        isOpen={isNewOpen}
        refreshCentral={refreshCentral}
        setIsOpen={setIsNewOpen}
      />
      <ConfirmModal
        isOpen={Boolean(isModalOpen)}
        onClose={() => setIsModalOpen(null)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this category?"
        confirmText={isDelLoading ? "Loading..." : "Yes, I'm sure"}
        cancelText="No, cancel"
      />
      <DynamicTable
        isLoading={isLoading}
        columns={columns}
        data={categories}
        actions={actions}
        pagination={{
          Component: Pagination,
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default CategoryManagement;
