import { ConfigModuleOptions } from '@nestjs/config';

import { configLoader } from '@/config/config.loader';
import { configSchema } from '@/config/config.schema';

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: configLoader,
  validationSchema: configSchema,
};
