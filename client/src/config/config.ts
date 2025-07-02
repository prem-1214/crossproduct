const _config = {
  NODE_ENV: import.meta.env.VITE_NODE_ENV || "development",
  IS_PRODUCTION: import.meta.env.VITE_NODE_ENV === "production",
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173",
  API_URL: import.meta.env.VITE_API_URL || "http://localost:3000/api/v1",
};

export const config = Object.freeze(_config);
