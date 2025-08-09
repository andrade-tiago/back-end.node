import { IEmailAddressFactory } from "@/domain/factories/IEmailAddressFactory";
import { IEmailAddressParser } from "@/domain/parsers/IEmailAddressParser";
import { EmailAddressCreateValue, EmailAddress } from "@/domain/value-objects/EmailAddress";

type FactoryDependencies = {
  emailAddressParser: IEmailAddressParser;
}

export class EmailAddressFactory implements IEmailAddressFactory
{
  private readonly emailAddressParser: IEmailAddressParser;

  public constructor(dependencies: FactoryDependencies)
  {
    this.emailAddressParser = dependencies.emailAddressParser;
  }

  public create(value: EmailAddressCreateValue): EmailAddress
  {
    return EmailAddress.create(value, { parser: this.emailAddressParser });
  }
}
