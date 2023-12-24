// Динаический модуль
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import applicationConfig from './app.config';
// import mongoConfig from "./mongo.config";
import mongoConfigClass from './mongo.config.class';

const ENV_USERS_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO: Передать список конфигураций для загрущки
      load: [applicationConfig, mongoConfigClass],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})

export class ConfigAccountModule {}


// Регистрация в configService для основного входа в приложения
// Можно переключаться через mongoConfigClass либо mongoConfig
