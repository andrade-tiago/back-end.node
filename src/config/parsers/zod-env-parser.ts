import { z } from "zod";
import { Env, IEnvParser } from "../env.parser";

function createSchemaFromType<T>(schema: { [K in keyof T]: z.ZodType<T[K]> }) {
  return z.object(schema);
}

const envSchema = createSchemaFromType<Env>({
  ACCESS_TOKEN_TTL: z.coerce.number().min(60),
})

export class ZodEnvParser implements IEnvParser {
  parse(envObj: unknown): Env {
    return envSchema.parse(envObj);
  }
}
