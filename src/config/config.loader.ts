import { ConfigFactory } from '@nestjs/config';

export const configLoader: Array<ConfigFactory> = [
  () => ({
    environment: process.env.NODE_ENV,
    nest: {
      port: parseInt(process.env.PORT, 10),
    },
    mongo: {
      uri: process.env.MONGO_URI,
    },
  }),
];
