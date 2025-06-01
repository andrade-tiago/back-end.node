import { Email } from "@/domain/value-objects/email.vo";

export interface IEmailFactory {
  create(value: string): Email;
}
