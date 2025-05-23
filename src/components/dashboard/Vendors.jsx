import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { RECORDS_PER_PAGE } from "../../Utils/common-utils";
import { getVendorList } from "../../Utils/api";
import DynamicTable from "../common/table";

const Creators = () => {
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
  ];
  return (
    <div className="relative h-full overflow-hidden flex flex-col w-full p-4">
      {isLoading ? (
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
