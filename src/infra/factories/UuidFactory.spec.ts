import { testUuidFactory } from "@/domain/factories/IUuidFactory.test";
import { UuidFactory } from "./UuidFactory";
import { IUuidParser } from "@/domain/parsers/IUuidParser";
import { IUuidService } from "@/domain/services/IUuidService";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";

const uuidGenerator = { generate: () => mockUuid().value } satisfies IUuidService;
const uuidParser = { parse: value => value } satisfies IUuidParser;

testUuidFactory({
  getInstanceFunc: () => new UuidFactory({ uuidGenerator, uuidParser }),
});
