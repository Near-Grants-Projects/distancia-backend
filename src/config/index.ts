const { env } = process;
export default {
  PORT: env.PORT || 8000,
  ENVIRONMENT: env.NODE_ENV,
  MONGODB_URL: env.MONGODB_URL || "mongodb://127.0.0.1:27017/distancia",
};
