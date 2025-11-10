import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import {
  RECORDS_PER_PAGE,
} from "../../Utils/common-utils";
import { getInTouchList } from "../../Utils/api";
import DynamicTable from "../common/table";

const GetInTouch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = RECORDS_PER_PAGE;

  // new states for filters
  const [searchVal, setSearchVal] = useState("");
  const [type, setType] = useState(""); // "", "creator", "vendor"

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
      if (type) params.type = type;

      let response = await getInTouchList(params);
      if (response?.status === 200) {
        const data = response?.data;
        const totalPage = Math.ceil((data?.total || 1) / rowsPerPage);
        setTotalPages(totalPage);
        setCategories(data?.data);
      }
    } catch (error) {
      console.log("while fetching category", error);
    } finally {
      setIsLoading(false);
    }
  };

  // refresh when page / rowsPerPage / filters change
  useEffect(() => {
    refreshCentral();
    // eslint-disable-next-line
  }, [currentPage, rowsPerPage, debouncedSearchVal, type]);

  const columns = [
    {
      header: "Name",
      accessor: "name",
      render: (value) =>
        value ? <span className="">{value}</span> : "-",
    },
    {
      header: "Phone",
      accessor: "mobileNo",
      render: (value) => (value ? value : "-"),
    },
    {
      header: "Email",
      accessor: "email",
      render: (value) =>
        value ? (
          <span className="">{value}</span>
        ) : (
          "-"
        ),
    },
    {
      header: "Type",
      accessor: "type",
    },
    {
      header: "Website/Social Link",
      accessor: "url",
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 hover:underline cursor-pointer max-w-[200px] w-fit  overflow-hidden text-ellipsis block"
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
  ];

  const typeOptions = [
    { value: "", label: "All" },
    { value: "creator", label: "Creator" },
    { value: "vendor", label: "Brand" },
  ];
  return (
    <div className="relative h-full overflow-hidden flex flex-col w-full p-4">
      {isLoading ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 text-white flex justify-center items-center z-20">
          Loading...
        </div>
      ) : null}

      {/* Filters: search + type select */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search..."
          className="px-3 py-2 border rounded-md w-full max-w-sm focus:border focus:outline-none"
        />

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border rounded-md appearance-none focus:border focus:outline-none"
        >
          {typeOptions.map((opt) => (
            <option
              key={opt.value === "" ? "all" : opt.value}
              value={opt.value}
              selected={opt.value == type}
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

export default GetInTouch;