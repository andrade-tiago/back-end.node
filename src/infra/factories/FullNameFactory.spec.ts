import { testFullNameFactory } from "@/domain/factories/IFullNameFactory.test";
import { FullNameFactory } from "./FullNameFactory";
import { IFullNameParser } from "@/domain/parsers/IFullNameParser";

const mockFullNameParser = { parse: value => value } as IFullNameParser;

testFullNameFactory({
  getInstanceFunc: () => new FullNameFactory({ fullNameParser: mockFullNameParser }),
});
