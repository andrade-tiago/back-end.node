export interface IParser<TOutput> {
  parse(value: unknown): TOutput;
}
