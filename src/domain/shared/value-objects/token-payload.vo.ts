import { Email } from "@/domain/entities/user/value-objects/email.vo";
import { Uuid } from "./uuid.vo";

type TokenPayloadProps = {
  userId: Uuid;
  userEmail: Email;
}

export class TokenPayload {
  public readonly userId: string;
  public readonly email: string;

  public constructor(props: TokenPayloadProps) {
    this.userId = props.userId.value;
    this.email = props.userEmail.value;
  }
}
