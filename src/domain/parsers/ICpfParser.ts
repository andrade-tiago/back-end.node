import type { IParser } from "./__IParser";
import type { CpfValue } from "@/domain/value-objects/CPF";

export type CpfParserInput = string

export interface ICpfParser extends IParser<CpfParserInput, CpfValue> {}
