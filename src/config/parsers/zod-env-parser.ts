import { z } from "zod";
import { Env, IEnvParser } from "../env.parser";

export class ZodEnvParser implements IEnvParser {
  public parse(envObj: unknown): Env {
    return zodEnvSchema.parse(envObj);
  }
}

const zodEnvSchema = createSchemaFromType<Env>({
  ACCESS_TOKEN_TTL: z.coerce.number().int().min(60),
  HASH_SALT_OR_ROUNDS: z.union([
    z.coerce.number().int().min(1).max(20),
    z.string().min(1),
  ]),
});

function createSchemaFromType<T>(schema: { [K in keyof T]: z.ZodType<T[K]> }) {
  return z.object(schema);
}
