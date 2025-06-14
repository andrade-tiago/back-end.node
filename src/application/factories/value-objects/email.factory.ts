import { Email } from "@/domain/entities/user/value-objects/email.vo";

export interface IEmailFactory {
  create(value: string): Email;
}
