import { describe, expect, test } from "vitest";
import { Email } from "./email.vo";

describe('Email VO', () => {
  describe('should be created successfully', () => {
    const validEmails = [
      'foo@bar.com',
      'test@test.test',
    ];
    test.each(validEmails)('email: %s', email => {
      expect(new Email(email).value).toBe(email);
    })
  });

  describe('should throw an error if string to be an invalid email', () => {
    const invalidStrings = [
      '',
      'foo',
      'email.com', // no "@"
      'email @gmail.com', // space before "@"
      'email@.com', // invalid domain
      'email@@gmail.com', // double "@"
      'email@gmail', // no domain extension
      'email@g mail.com', // space on domain
      'email@exemplo', // no extension
      'email@exemplo.c', // invalid domain extension
    ];
    test.each(invalidStrings)('email: %s', email => {
      expect(() => new Email(email)).toThrow();
    });
  });
});
