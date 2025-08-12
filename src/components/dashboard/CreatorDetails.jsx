import React, { useEffect, useState } from "react";
// import Pagination from "../common/Pagination";
import {
  CREATOR_STATUS,
  // RECORDS_PER_PAGE,
  STATUS_COLOR,
} from "../../Utils/common-utils";
import {
  getCreatorDetails,
  // getCreatorList,
  postCreatorApprovedReject,
} from "../../Utils/api";
// import DynamicTable from "../common/table";
import { toastMessage } from "../../Utils/toast-message";
import { useParams } from "react-router-dom";

const CreatorDetails = () => {
  const { creatorId } = useParams();
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const refreshCentral = async () => {
    setIsLoading(true);
    try {
      let data = await getCreatorDetails(creatorId);
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
      let data = await postCreatorApprovedReject(params);
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
                creatorId: data?._id,
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
                creatorId: data?._id,
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
      <div className="p-6 bg-white shadow rounded-lg flex flex-col w-full max-w-4xl mx-auto space-y-6 overflow-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <img
            src={data?.profile_image || "/default-avatar.png"}
            alt={data?.full_name}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
              {data?.full_name} {renderStatusCell()}
            </h2>
            <p className="text-gray-500">@{data?.user_name}</p>
            <p className="text-sm text-gray-400">
              Joined:{" "}
              {new Date(data?.accountId?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Bio */}
        {data?.bio && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Bio</h3>
            <p className="text-gray-600">{data.bio}</p>
          </div>
        )}

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600">Email</h4>
            <p className="text-gray-800">{data?.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">Phone</h4>
            <p className="text-gray-800">{data?.phone || "N/A"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">State</h4>
            <p className="text-gray-800">{data?.state || "N/A"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">City</h4>
            <p className="text-gray-800">{data?.city || "N/A"}</p>
          </div>
        </div>

        {/* Connected Channels */}
        {data?.channels?.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Connected Channels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.channels.map((channel) => {
                const isYouTube = channel.channelType === "youtube";
                const platformColor = isYouTube
                  ? "text-red-600"
                  : "text-pink-500";
                const platformIcon = isYouTube ? (
                  // YouTube Icon
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M549.7 124.1c-6.3-23.7-24.9-42.4-48.6-48.7C456.4 64 288 64 288 64s-168.4 0-213.1 11.4c-23.7 6.3-42.4 25-48.7 48.7C16.9 168.8 16 224 16 224s-.9 55.2 10.2 99.9c6.3 23.7 25 42.4 48.7 48.7C119.6 384 288 384 288 384s168.4 0 213.1-11.4c23.7-6.3 42.4-25 48.6-48.7 11.1-44.7 11.1-99.9 11.1-99.9s0-55.2-11.1-99.9zM232 312V136l142 88-142 88z" />
                  </svg>
                ) : (
                  // Instagram Icon
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7s33.4-74.7 74.7-74.7 74.7 33.4 74.7 74.7-33.4 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6S365.7 16.7 330 15C293.5 13.3 182.5 13.3 146 15 110.3 16.7 78.7 25 52.4 51.3 26.1 77.6 17.8 109.2 16.1 144.9 14.4 181.4 14.4 292.4 16.1 328.9c1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c36.5 1.7 147.5 1.7 184 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c1.7-36.5 1.7-147.5 0-184zM398.8 388c-7.8 19.5-22.9 34.6-42.4 42.4-29.4 11.7-99.2 9-132.4 9s-103 2.6-132.4-9c-19.5-7.8-34.6-22.9-42.4-42.4-11.7-29.4-9-99.2-9-132.4s-2.6-103 9-132.4c7.8-19.5 22.9-34.6 42.4-42.4C122.6 60.6 192.4 63.2 225.6 63.2s103-2.6 132.4 9c19.5 7.8 34.6 22.9 42.4 42.4 11.7 29.4 9 99.2 9 132.4s2.7 103-9 132.4z" />
                  </svg>
                );

                return (
                  <div
                    key={channel._id}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow transition hover:shadow-md flex items-start gap-4 cursor-pointer"
                    onClick={() => {
                      if (isYouTube && data?.youtube_link) {
                        window.open(data.youtube_link, "_blank");
                      } else if (!isYouTube && data?.instagram_link) {
                        window.open(data.instagram_link, "_blank");
                      }
                    }}
                  >
                    <div className={`shrink-0 ${platformColor}`}>
                      {platformIcon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {channel.channelName}
                        </h4>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {channel.channelType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {channel.handleName}
                      </p>

                      <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-600 mt-2">
                        <p>
                          Followers:{" "}
                          <span className="font-medium">
                            {channel.followers ?? 0}
                          </span>
                        </p>
                        <p>
                          Last 5 Videos:{" "}
                          <span className="font-medium">
                            {channel.lastFiveVideoViews ?? 0}
                          </span>
                        </p>
                        <p>
                          Last Month Views:{" "}
                          <span className="font-medium">
                            {channel.lastMonthViews ?? 0}
                          </span>
                        </p>
                        <p>
                          Created:{" "}
                          <span className="text-gray-400">
                            {new Date(channel.createdAt).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Social Links */}
        {/* {(data?.youtube_link || data?.instagram_link) && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Social Media
            </h3>
            <div className="flex gap-4 flex-wrap">
              {data.youtube_link && (
                <a
                  href={data.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <svg
                    className="w-5 h-5 mt-1"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M549.7 124.1c-6.3-23.7-24.9-42.4-48.6-48.7C456.4 64 288 64 288 64s-168.4 0-213.1 11.4c-23.7 6.3-42.4 25-48.7 48.7C16.9 168.8 16 224 16 224s-.9 55.2 10.2 99.9c6.3 23.7 25 42.4 48.7 48.7C119.6 384 288 384 288 384s168.4 0 213.1-11.4c23.7-6.3 42.4-25 48.6-48.7 11.1-44.7 11.1-99.9 11.1-99.9s0-55.2-11.1-99.9zM232 312V136l142 88-142 88z" />
                  </svg>
                  YouTube
                </a>
              )}

              {data.instagram_link && (
                <a
                  href={data?.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline flex items-center gap-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7s33.4-74.7 74.7-74.7 74.7 33.4 74.7 74.7-33.4 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6S365.7 16.7 330 15C293.5 13.3 182.5 13.3 146 15 110.3 16.7 78.7 25 52.4 51.3 26.1 77.6 17.8 109.2 16.1 144.9 14.4 181.4 14.4 292.4 16.1 328.9c1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c36.5 1.7 147.5 1.7 184 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c1.7-36.5 1.7-147.5 0-184zM398.8 388c-7.8 19.5-22.9 34.6-42.4 42.4-29.4 11.7-99.2 9-132.4 9s-103 2.6-132.4-9c-19.5-7.8-34.6-22.9-42.4-42.4-11.7-29.4-9-99.2-9-132.4s-2.6-103 9-132.4c7.8-19.5 22.9-34.6 42.4-42.4C122.6 60.6 192.4 63.2 225.6 63.2s103-2.6 132.4 9c19.5 7.8 34.6 22.9 42.4 42.4 11.7 29.4 9 99.2 9 132.4s2.7 103-9 132.4z" />
                  </svg>
                  Instagram
                </a>
              )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CreatorDetails;
