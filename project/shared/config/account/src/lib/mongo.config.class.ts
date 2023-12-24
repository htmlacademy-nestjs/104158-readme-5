// Валидация и извлечение настроек через class validator
import { registerAs } from "@nestjs/config";
import { ConfigType } from "@nestjs/config";
import { MongoConfiguration } from "./mongodb/mongo.env";
import { DEFAULT_MONGO_PORT } from './mongodb/mongo.const';
import { plainToClass } from "class-transformer";

export interface MongoCongif {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

async function getDbConfig(): Promise<MongoConfiguration> {
  const config = plainToClass(MongoConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE
  });

  await config.validate();
  console.log(config);
  return config;

}

export default registerAs('db', async (): Promise<ConfigType<typeof getDbConfig>> => {
  return getDbConfig();
})
