import { DomainError } from "./_domain-error";

export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
