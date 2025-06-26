import { describe, expect, it, test } from "vitest";
import { CPF } from "./cpf.vo";

describe('CPF VO', () => {
  it('should created successfully', () => {
    const validCPFs = [
      '81932891021',
      '42394484098',
      '850.728.810-32',
      '999.149.400-64',
    ];

    validCPFs.forEach(cpf => {
      expect(new CPF(cpf).value).toBe(cpf.replaceAll(/[^0-9]/g, ''));
    });
  });

  describe('should throw an error', () => {
    test('if value to be a random string', () => {
      const randomStrings = [
        '',
        'foo',
        'asdfghjklqw',
      ];

      randomStrings.forEach(str => {
        expect(() => new CPF(str)).toThrow();
      });
    });

    test('if value contains the wrong number of digits', () => {
      expect(() => new CPF('1234567890')).toThrow();
      expect(() => new CPF('123456789012')).toThrow();
    });

    test('if the digits are invalid', () => {
      expect(() => new CPF('012345678901')).toThrow();
    });
  });
});
