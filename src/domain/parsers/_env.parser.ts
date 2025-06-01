import { Env } from "@/types/env.type";

export interface EnvParser {
  parse(envObj: unknown): Env;
}
