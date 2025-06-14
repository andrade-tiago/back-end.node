import { Email } from "@/domain/entities/user/value-objects/email.vo";
import { Uuid } from "./uuid.vo";

type TokenPayloadProps = {
  sub: Uuid;
  email: Email;
  ttlInSec: number;
}

export class TokenPayload {
  public readonly sub: string;
  public readonly email: string;
  public readonly iat: number;
  public readonly exp: number;

  public constructor(props: TokenPayloadProps) {
    this.sub = props.sub.value;
    this.email = props.email.value;

    const now = Math.floor(Date.now() / 1000);

    this.iat = now;
    this.exp = now + props.ttlInSec;
  }
}
