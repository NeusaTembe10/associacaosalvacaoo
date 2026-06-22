const apiUrl = import.meta.env.VITE_API_URL?.trim();
const isLocalHost = typeof window !== "undefined" && window.location.hostname === "localhost";

export const API_URL = apiUrl && apiUrl !== ""
  ? isLocalHost
    ? apiUrl
    : apiUrl.includes("localhost")
      ? "/api"
      : apiUrl
  : "/api";
