import { describe, expect, it } from "vitest";
import { Uuid } from "./uuid.vo";

describe('UUID VO', () => {
  it('should be created successfully', () => {
    const validUUIDs = [
      '4c92e41e-5168-4a36-aff6-a68c0d1d3845',
      '1e49b30b-0d86-4aff-85a3-01968d6a85cc',
      '95e67eeb-57c6-4e29-b337-3dfb843a30f7',
      '3310834a-e367-41c1-8f60-5ba2f6f3e875',
      '0f4312e0-825f-40b6-9a5f-4ff22e4a04b2',
    ];

    validUUIDs.forEach(uuid => {
      expect(new Uuid(uuid).value).toBe(uuid);
    });
  });

  it('should throw an error if value to be not a string in correct format', () => {
    const invalidUuidStrings = [
      '',
      'foo',
      '4c92e41e-5168-5a36-aff6-a68c0d1d3845',
      '4c92e41e-5168-4a36-4ff6-a68c0d1d3845',
    ];

    invalidUuidStrings.forEach(str => {
      expect(() => new Uuid(str)).toThrow();
    });
  });
});