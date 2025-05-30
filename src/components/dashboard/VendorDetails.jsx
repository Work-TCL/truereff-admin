import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import {
  CREATOR_STATUS,
  RECORDS_PER_PAGE,
  STATUS_COLOR,
} from "../../Utils/common-utils";
import {
  getCreatorDetails,
  getCreatorList,
  getVendorDetails,
  postCreatorApprovedReject,
  postVendorApprovedReject,
} from "../../Utils/api";
import DynamicTable from "../common/table";
import { toastMessage } from "../../Utils/toast-message";
import { Link, useParams } from "react-router-dom";

const VendorDetails = () => {
  const { vendorId } = useParams();
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const refreshCentral = async () => {
    setIsLoading(true);
    try {
      let data = await getVendorDetails(vendorId);
      console.log("data", data);
      if (data?.status === 200) {
        data = data?.data;
        setData(data);
      }
    } catch (error) {
      console.log("while fetching creators");
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

  const renderStatusCell = () => {
    if (!data?.status) return "-";

    if (data?.status === CREATOR_STATUS.PENDING_APPROVAL) {
      return (
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={() =>
              handleCreatorStatus({
                vendorId: data?._id,
                status: CREATOR_STATUS.APPROVED,
              })
            }
            className="px-3 py-2 text-xs font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Approve
          </button>
          <button
            onClick={() =>
              handleCreatorStatus({
                vendorId: data?._id,
                status: CREATOR_STATUS.REJECTED,
              })
            }
            className="px-3 py-2 text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Reject
          </button>
        </div>
      );
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
          STATUS_COLOR[data?.status] ?? "bg-gray-100 text-gray-600"
        }`}
      >
        {data?.status}
      </span>
    );
  };

  useEffect(() => {
    refreshCentral();
    //eslint-disable-next-line
  }, []);

  console.log("data", data);

  return (
    <div className="relative h-full overflow-hidden flex flex-col w-full p-4">
      {isLoading || isDelLoading ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 text-white flex justify-center items-center z-20">
          Loading...
        </div>
      ) : null}
      <div className="max-w-4xl mx-auto w-full mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-sm text-gray-900 hover:underline"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
      {/* <div className="relative h-full overflow-hidden flex flex-col w-full p-4"> */}
      <div className="p-6 bg-white shadow rounded-lg flex flex-col w-full max-w-4xl mx-auto space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={data?.profile_image || "/default-avatar.png"}
            alt={data?.business_name}
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
              {data?.business_name}
              {renderStatusCell()}
            </h2>
            <p className="text-gray-500">{data?.website}</p>
            <p className="text-sm text-gray-400">
              Registered: {new Date(data?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600">Company Email</h4>
            <p className="text-gray-800">{data?.company_email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">Phone</h4>
            <p className="text-gray-800">{data?.accountId?.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">
              Type of Business
            </h4>
            <p className="text-gray-800">{data?.type_of_business}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">Website</h4>
            <a
              href={data?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data?.website}
            </a>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">GST Number</h4>
            <p className="text-gray-800">{data?.gst_number}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">PAN Number</h4>
            <p className="text-gray-800">{data?.pan_number}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">State</h4>
            <p className="text-gray-800">{data?.state}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">City</h4>
            <p className="text-gray-800">{data?.city}</p>
          </div>
          <div className="">
            <h4 className="text-sm font-medium text-gray-600">Address</h4>
            <p className="text-gray-800">{data?.address}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">Pincode</h4>
            <p className="text-gray-800">{data?.pin_code}</p>
          </div>
        </div>

        {/* GST Certificate */}
        {data?.gst_certificate && (
          <div>
            <h4 className="text-sm font-medium text-gray-600">
              GST Certificate
            </h4>
            <a
              href={data.gst_certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Document
            </a>
          </div>
        )}

        {/* Category Info */}
        <div>
          <h4 className="text-sm font-medium text-gray-600">Category</h4>
          <p className="text-gray-800">
            {data.category?.map((cat) => cat.name).join(", ") || "N/A"}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600">Sub Category</h4>
          <p className="text-gray-800">
            {data.sub_category?.map((sub) => sub.name).join(", ") || "N/A"}
          </p>
        </div>

        {/* Contacts */}
        {data?.contacts?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.contacts.map((contact) => (
                <div key={contact._id} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.channels?.length > 0 &&
          data?.channels.map((channel) => (
            <div
              key={channel.channelId}
              className="bg-gradient-to-r from-pink-100 to-cyan-100 border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold capitalize text-gray-800 flex items-center gap-2">
                  <span className="inline-block bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded-full">
                    {channel.channelType}
                  </span>
                  Channel
                </h2>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    channel.channelStatus === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {channel.channelStatus}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Domain:</strong>{" "}
                <Link
                  to={`https://${channel.channelConfig?.domain}`}
                  target="_blank"
                  className="hover:underline hover:text-blue-500"
                >
                  {channel.channelConfig?.domain}
                </Link>
              </p>
              <p className="text-xs text-gray-400">
                Created: {new Date(channel.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default VendorDetails;
