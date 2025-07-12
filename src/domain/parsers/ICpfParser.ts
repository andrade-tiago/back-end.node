import type { CPF } from "@/domain/value-objects/CPF";
import type { IParser } from "./__IParser";

export interface ICpfParser extends IParser<CPF['_value']> {}
