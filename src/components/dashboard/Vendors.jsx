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

  // new states for filters
  const [searchVal, setSearchVal] = useState("");
  const [step, setStep] = useState(""); // "", "1", "2", "3"

  // debounced search value
  const [debouncedSearchVal, setDebouncedSearchVal] = useState(searchVal);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchVal(searchVal.trim());
      setCurrentPage(1); // reset page when debounced value changes
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchVal]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const refreshCentral = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: rowsPerPage,
      };
      if (debouncedSearchVal?.trim() !== "") params.search = debouncedSearchVal;
      if (step) params.step = Number(step);

      let data = await getVendorList(params);
      console.log("data", data);
      if (data?.status === 200) {
        data = data?.data;
        const totalPage = Math.ceil((data?.total || 1) / rowsPerPage);
        console.log("totalPage", totalPage);

        setTotalPages(totalPage);
        setCategories(data?.list);
      }
    } catch (error) {
      console.log("while fetching category", error);
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
        refreshCentral();
        return true;
      }
      throw data;
    } catch (error) {
      toastMessage.error("Failed to update status");
    } finally {
      setIsDelLoading(false);
    }
  };

  // refresh when page / rowsPerPage / filters change
  useEffect(() => {
    refreshCentral();
    // eslint-disable-next-line
  }, [currentPage, rowsPerPage, debouncedSearchVal, step]);

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
      header: "Business Phone",
      accessor: "accountId",
      render: (value) => (value?.phone ? value?.phone : "-"),
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

  const STEP_COUNT = 3;
  const stepOptions = [
    { value: "", label: "All Steps" },
    ...Array.from({ length: STEP_COUNT }, (_, i) => ({
      value: String(i + 1),
      label: `Step ${i + 1}`,
    })),
  ];
  return (
    <div className="relative h-full overflow-hidden flex flex-col w-full p-4">
      {isLoading || isDelLoading ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 text-white flex justify-center items-center z-20">
          Loading...
        </div>
      ) : null}

      {/* Filters: search + step select */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search Brands"
          className="px-3 py-2 border rounded-md w-full max-w-sm focus:border focus:outline-none"
        />

        <select
          value={step}
          onChange={(e) => {
            setStep(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border rounded-md appearance-none focus:border focus:outline-none"
        >
          {stepOptions.map((opt) => (
            <option
              key={opt.value === "" ? "all" : opt.value}
              value={opt.value}
              selected={opt.value == step}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

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
