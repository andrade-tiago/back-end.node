export class LoginError extends Error {
  public constructor() {
    super(`Incorrect email or password`);
  }
}