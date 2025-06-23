import { Email } from "@/domain/entities/user/value-objects/email.vo";
import { IEmailFactory } from "../email.factory";

export class EmailFactory implements IEmailFactory {
  public create(value: string): Email {
    return new Email(value);
  }
}
