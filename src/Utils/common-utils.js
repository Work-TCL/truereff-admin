import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function getAccessToken() {
  return localStorage.getItem("token");
}

export function clearLocalStorage() {
  localStorage.clear();
}

export const getErrorMessage = (error) => {
  if (typeof error === "object" && error !== null) {
    const axiosError = error;
    if (axiosError.response?.data?.message) {
      return axiosError?.response?.data?.message || "internal server error";
    }

    const genericError = error;
    if (genericError.message) {
      return genericError.message;
    } else if (genericError.error) {
      return genericError.error;
    }

    const validationError = error;
    if (validationError.errors) {
      return Object.values(validationError.errors).join(", ");
    }
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  }

  return "Internal server error";
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const RECORDS_PER_PAGE = 2

export const CREATOR_STATUS = {
  IN_PROGRESS: "IN_PROGRESS", PENDING_APPROVAL: "PENDING_APPROVAL", APPROVED: "APPROVED", REJECTED: "REJECTED"
}

export const STATUS_COLOR = {
  "": "bg-gray-400 text-black",
  IN_PROGRESS: "bg-[#FF9500] text-[#FF9500]",
  REJECTED: "bg-[#FF3B30] text-[#FF3B30]",
  PENDING_APPROVAL: "bg-[#5856D6] text-[#5856D6]",
  APPROVED: "bg-[#098228] text-[#098228]",
}
export function formatNumber(num = 0) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"; // Billion
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"; // Million
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K"; // Thousand
  }
  return num === 0 ? "0" : formatFloatValue(num).toString(); // Default case
}
export const formatDate = (dateString) => {
  if (!dateString) return "-"; // Handle empty or null dates
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatFloatValue = (value = 0) => {
  return value % 1 === 0 ? value : value.toFixed(2);
};