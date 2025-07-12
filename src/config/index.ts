import { AppConfig } from "./AppConfig";
import { ZodEnvParser } from "./parsers/ZodEnvParser";

const envParser = new ZodEnvParser();

export const appConfig = new AppConfig(envParser);
