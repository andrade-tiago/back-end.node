import type { Uuid } from "../value-objects/Uuid";
import type { IParser } from "./__IParser";

export interface IUuidParser extends IParser<Uuid['_value']> {}
