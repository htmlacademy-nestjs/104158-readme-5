// Валидация и извлечение настроек

import { registerAs } from "@nestjs/config";
import * as Joi from 'joi';

const DEFAULT_MONGO_PORT = 27017;

export interface MongoCongif {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

const dbValidationSchema = Joi.object({
  host: Joi.string().hostname().required(),
  name: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_MONGO_PORT),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
})

function validateMongoConfig(config: MongoCongif) {
  const { error } = dbValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error (`[DB Config Validation Error]: ${error.message}`);
  }
}

function getDbConfig(): MongoCongif {
  const config: MongoCongif = {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: parseInt(process.env.MONGO_PORT ?? `${DEFAULT_MONGO_PORT}`, 10),
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  }

  validateMongoConfig(config);
  console.log(config);
  return config;
}

export default registerAs('db', getDbConfig);
