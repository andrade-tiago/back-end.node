import { AppConfig } from "./app-config";
import { ZodEnvParser } from "./parsers/zod-env-parser";

const envParser = new ZodEnvParser();

export const appConfig = new AppConfig(envParser);
