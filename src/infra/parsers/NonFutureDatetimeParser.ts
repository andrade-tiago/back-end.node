import { ErrorMessages, InvalidDataError } from "@/domain/errors";
import { INonFutureDatetimeParser, NonFutureDatetimeParserInput } from "@/domain/parsers/INonFutureDatetimeParser";

export class NonFutureDatetimeParser implements INonFutureDatetimeParser
{
  private nowDatetime!: Date;

  public parse(value: NonFutureDatetimeParserInput): string
  {
    this.nowDatetime = new Date();

    const datetime = this.normalizeTimestampToDateInstance(value);
    this.checkIfDatetimeIsReadable(datetime);
    this.checkIfDatetimeIsNotFuture(datetime);

    return datetime.toISOString();
  }

  private normalizeTimestampToDateInstance(timestamp: NonFutureDatetimeParserInput): Date
  {
    if (typeof timestamp == 'string')
    {
      timestamp = timestamp.trim();
    }
    return new Date(timestamp);
  }

  private checkIfDatetimeIsReadable(datetime: Date): void
  {
    const datetimeInMilliseconds = datetime.valueOf();

    if (Number.isNaN(datetimeInMilliseconds))
    {
      throw new InvalidDataError(ErrorMessages.Date.InvalidDate);
    }
  }
  private checkIfDatetimeIsNotFuture(datetime: Date): void
  {
    if (datetime > this.nowDatetime)
    {
      throw new InvalidDataError(ErrorMessages.Date.FutureDate);
    }
  }
}
