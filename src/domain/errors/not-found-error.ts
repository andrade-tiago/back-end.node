import { DomainError } from "./_domain-error";

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
