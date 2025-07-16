import type { IParser } from "./__IParser";
import type { CPF, CpfCreateValue } from "@/domain/value-objects/CPF";

export interface ICpfParser extends IParser<CpfCreateValue, CPF['_value']> {}
