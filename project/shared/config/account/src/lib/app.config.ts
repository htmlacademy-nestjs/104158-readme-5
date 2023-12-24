// Валидация и извлечение настроек

import { registerAs } from "@nestjs/config";
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = typeof ENVIRONMENTS[number];

// Интерфейс (Типы)
export interface ApplicationConfig {
  environment: string;
  port: number;
}

// Схема валидации
const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

// Конфигурация валидации
function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`)
  }
}

// Функция собирает все в едино и запускает валидацию, распрсит необходимые значения
function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    // parseInt преобразовывает строку к числу так как порт это number
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  };
  validateConfig(config);
  return config;
}

// registerAs - помогает зарегистрировать название и принимает колбэк который возвращает конфиг
export default registerAs('application', getConfig);
