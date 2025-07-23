import type { INonFutureDatetimeParser, NonFutureDatetimeParserInput } from '@/domain/parsers/INonFutureDatetimeParser';
import { NonFutureDatetime, NonFutureDatetimeValue } from './NonFutureDatetime';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { InvalidDataError } from '@/domain/errors';

describe('NonFutureDatetime Value Object', () =>
{
  const validTestInput: NonFutureDatetimeParserInput = faker.date.past();
  const invalidTestInput: NonFutureDatetimeParserInput = faker.date.future()
  const testParserOutput: NonFutureDatetimeValue = faker.date.past().toISOString();

  let parser: INonFutureDatetimeParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<INonFutureDatetimeParser['parse']>((input) =>
      {
        if (input === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid datetime');
      }),
    };
  });

  it('should create a NonFutureDatetime using the parser', () =>
  {
    const result = NonFutureDatetime.create(validTestInput, { parser });

    expect(result).toBeInstanceOf(NonFutureDatetime);
    expect(result.value).toBe(testParserOutput);
    expect(result.toDate().toISOString()).toBe(testParserOutput);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
  });

  it('should return new instance if NonFutureDatetime is passed to create()', () =>
  {
    const original = NonFutureDatetime.unsafeCreate(testParserOutput);
    const result = NonFutureDatetime.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => NonFutureDatetime.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const datetime = NonFutureDatetime.unsafeCreate(testParserOutput);

    expect(datetime).toBeInstanceOf(NonFutureDatetime);
    expect(datetime.value).toBe(testParserOutput);
  });

  it('should convert its value to a Date object', () =>
  {
    const datetimeISOString = new Date().toISOString();

    const instance = NonFutureDatetime.unsafeCreate(datetimeISOString);

    expect(instance.toDate().toISOString())
      .toBe(datetimeISOString);
  });

  it('should create a NonFutureDatetime representing now using now()', () =>
  {
    const now = new Date();
    
    vi.useFakeTimers();
    vi.setSystemTime(now);

    expect(NonFutureDatetime.now().value)
      .toBe(now.toISOString());

    vi.useRealTimers();
  });
});
