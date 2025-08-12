import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import {
  CREATOR_STATUS,
  RECORDS_PER_PAGE,
  STATUS_COLOR,
} from "../../Utils/common-utils";
import { getVendorList, postVendorApprovedReject } from "../../Utils/api";
import DynamicTable from "../common/table";
import { toastMessage } from "../../Utils/toast-message";
import { Link } from "react-router-dom";

const Creators = () => {
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      let data = await getVendorList({ page: currentPage, limit: rowsPerPage });
      console.log("data", data);
      if (data?.status === 200) {
        data = data?.data;
        const totalPage = Math.ceil((data?.total || 1) / rowsPerPage);
        console.log("totalPage", totalPage);

        setTotalPages(totalPage);
        setCategories(data?.list);
      }
    } catch (error) {
      console.log("while fetching category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatorStatus = async (params) => {
    setIsDelLoading(true);
    try {
      let data = await postVendorApprovedReject(params);
      if (data?.status === 200) {
        toastMessage.success(data?.message || "Approved.");
        // setIsModalOpen(null);
        refreshCentral();
        return true;
      }
      throw data;
    } catch (error) {
      toastMessage.error("Failed to update status");
    } finally {
      // setIsModalOpen(null);
      setIsDelLoading(false);
    }
  };

  useEffect(() => {
    refreshCentral();
    // eslint-disable-next-line
  }, [currentPage, rowsPerPage]);

  const columns = [
    {
      header: "User Name",
      accessor: "accountId",
      render: (value) =>
        value ? <span className="">{value?.name}</span> : "-",
    },
    {
      header: "Business Name",
      accessor: "business_name",
      render: (value, item) =>
        value ? (
          <Link
            to={`/vendors/${item?._id}`}
            className="text-blue-500 hover:underline"
          >
            {value}
          </Link>
        ) : (
          "-"
        ),
    },
    {
      header: "Business Email",
      accessor: "company_email",
    },
    {
      header: "Completed Step",
      accessor: "completed_step",
    },
    {
      header: "Category",
      accessor: "category",
      render: (value) =>
        value ? (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
            {value?.map((v) => v.name)?.join(",")}
          </span>
        ) : (
          "-"
        ),
    },
    {
      header: "Type",
      accessor: "type_of_business",
    },
    {
      header: "Website",
      accessor: "website",
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 hover:underline cursor-pointer"
          >
            {value}
          </a>
        ) : (
          "-"
        ),
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
    {
      header: "Status",
      accessor: "status",
      render: (value, item) =>
        value ? (
          value === CREATOR_STATUS.PENDING_APPROVAL ? (
            <div className="flex items-center gap-2 mx-auto">
              <button
                onClick={() =>
                  handleCreatorStatus({
                    vendorId: item?._id,
                    status: CREATOR_STATUS.APPROVED,
                  })
                }
                className={`text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 focus:ring-green-300 px-3 py-2 text-xs font-medium rounded-lg focus:ring-4 focus:outline-none`}
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleCreatorStatus({
                    vendorId: item?._id,
                    status: CREATOR_STATUS.REJECTED,
                  })
                }
                className={`text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 focus:ring-red-300 px-3 py-2 text-xs font-medium rounded-lg focus:ring-4 focus:outline-none`}
              >
                Reject
              </button>
            </div>
          ) : (
            <span
              className={`px-3 py-1 ${
                STATUS_COLOR[value ?? ""]
              } bg-opacity-10 rounded-full text-xs font-medium`}
            >
              {value}
            </span>
          )
        ) : (
          "-"
        ),
    },
  ];
  return (
    <div className="relative h-full overflow-hidden flex flex-col w-full p-4">
      {isLoading || isDelLoading ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 text-white flex justify-center items-center z-20">
          Loading...
        </div>
      ) : null}
      <DynamicTable
        columns={columns}
        data={categories}
        actions={[]}
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

export default Creators;
