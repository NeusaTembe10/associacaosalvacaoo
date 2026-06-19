const apiUrl = import.meta.env.VITE_API_URL?.trim();
const isLocalHost = typeof window !== "undefined" && window.location.hostname === "localhost";

export const API_URL = apiUrl && apiUrl !== ""
  ? isLocalHost
    ? apiUrl
    : apiUrl.includes("localhost")
      ? "/api"
      : apiUrl
  : "/api";
const res = await fetch('/api/...');
if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
  const text = await res.text();
  console.error('Resposta inesperada:', text);
  throw new Error('Erro do servidor');
}
const data = await res.json();