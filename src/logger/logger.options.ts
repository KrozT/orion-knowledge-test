import { Options } from 'pino-http';

export const loggerOptions: { pinoHttp: Options } = {
  pinoHttp: {
    level: 'info',
    messageKey: 'message',
  },
};
