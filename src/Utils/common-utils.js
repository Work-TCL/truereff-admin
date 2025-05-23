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

export const RECORDS_PER_PAGE = 10

export const CREATOR_STATUS = {
  IN_PROGRESS: "IN_PROGRESS", PENDING_APPROVAL: "PENDING_APPROVAL", APPROVED: "APPROVED", REJECTED: "REJECTED"
}