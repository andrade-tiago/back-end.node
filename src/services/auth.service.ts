export interface IAuthService {
  generateToken<T>(payload: T): Promise<string>;
  parseToken<T>(token: string): Promise<T>;
}
