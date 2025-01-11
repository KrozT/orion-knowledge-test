import Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.string().default(3000),
  MONGO_URI: Joi.string().required(),
});
