import type { IParser } from "./__IParser";
import type { CPF } from "@/domain/value-objects/CPF";

export interface ICpfParser extends IParser<CPF['_value']> {}
