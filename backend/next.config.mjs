import { resolve } from "path";

const root = resolve(".");

export default {
  experimental: {
    outputStandalone: true,
  },
  build: {
    transpile: ["src"],
  },
};
