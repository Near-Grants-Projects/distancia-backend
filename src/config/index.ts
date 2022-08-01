const { env } = process;
export default {
  PORT: env.PORT || 8000,
  ENVIRONMENT: env.NODE_ENV,
  MONGODB_URL: env.MONGODB_URL || 'mongodb://127.0.0.1:27017/distancia',
  JWT_SECRET: process.env.JWT_SECRET || 'ss4.@SGGio082',
  HEADER_NAME: process.env.HEADER_NAME || 'distancia-auth-token',
  JWT_DURATION: process.env.JWT_DURATION || '1h',
};
