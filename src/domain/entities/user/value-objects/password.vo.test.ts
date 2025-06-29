import { describe, expect, test } from "vitest";
import { Password } from "./password.vo";

describe('Password VO', () => {
  describe('should be created successfully', () => {
    const validHashedPasswords: ConstructorParameters<typeof Password>[0][] = [
      '$2a$12$Sk/1WltwtSZGtP63XvxVP.1PpUXkT/VLfHWBcg8ya7oY1qkgzOZlS',
      '$2a$12$9RxLxVSoTROnYPR6OkI.Vu2DqIc5i2wXiYCNeTaJ4/IQgrJa5ZYZ6',
      '$2a$12$wZmZBsccVt8XODTCy9mZKeOKb4ugoUDxf1Z8gL5CSYG2YTp.5iSra',
      '$2a$12$UMnQdEz7/7UzQRlURwfnlOBU4NbTQwWzlXMeLs2Rk/k4mZG41HlFW',
    ];

    test.each(validHashedPasswords)('hash: %s', hash => {
      expect(new Password(hash).value)
        .toBe(hash);
    });
  });

  describe('should throw an error if value to be a non correctly string', () => {
    const invalidHashes: ConstructorParameters<typeof Password>[0][] = [
      '',
      'foo',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', // expected length, but invalid  
      '$2c$12$Sk/1WltwtSZGtP63XvxVP.1PpUXkT/VLfHWBcg8ya7oY1qkgzOZlS', // "c", instead of "a", "b" or "y"
      '$2a$12$9RxLxVSoTROnYPR6OkI.Vu2DqIc5i2wXiYCNeTaJ4/IQgrJa5ZYZ', // wrong length
      '$2a$12$9RxLxVSoTROnYPR6OkI.Vu2DqIc5@2wXiYCNeTaJ4/IQgrJa5ZYZ6', // invalid char "@"
    ];

    test.each(invalidHashes)("string: %s", str => {
      expect(() => new Password(str))
        .toThrow();
    });
  });
});
