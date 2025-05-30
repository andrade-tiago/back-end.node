import { Email } from "./email.vo";

export interface IEmailFactory {
  create(value: string): Email;
}
