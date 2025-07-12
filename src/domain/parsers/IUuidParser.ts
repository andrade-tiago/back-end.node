import type { IParser } from "./__IParser";
import type { Uuid } from "@/domain/value-objects/Uuid";

export interface IUuidParser extends IParser<Uuid['_value']> {}
