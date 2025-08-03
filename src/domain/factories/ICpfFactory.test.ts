import type { ICpfFactory } from "./ICpfFactory";
import { CPF, type CpfCreateValue } from "@/domain/value-objects/CPF";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockCPF } from "@/domain/value-objects/CPF.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "@/domain/errors";

type TestOptions = {
  getInstanceFunc: () => ICpfFactory;
}

export function testCpfFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - ICpfFactory`, () =>
  {
    let factoryInstance: ICpfFactory;

    const fakeCPF1: CPF = mockCPF();
    const fakeCPF2: CPF = mockCPF();
    const invalidCPF: CpfCreateValue = faker.color.human();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from a CPF instance successfully', () =>
    {
      const testCPF = factoryInstance.create(fakeCPF1);

      expect(testCPF).toBeInstanceOf(CPF);
      expect(testCPF.value).toBe(fakeCPF1.value);
    });

    it('should be created from a CPF value instance successfully', () =>
    {
      const testCPF = factoryInstance.create(fakeCPF1.value);

      expect(testCPF).toBeInstanceOf(CPF);
      expect(testCPF.value).toBe(fakeCPF1.value);
    });

    it('should throw for invalid values', () =>
    {
      expect(() => factoryInstance.create(invalidCPF)).toThrow(InvalidDataError);
    });

    it('should call CPF.create internally', () =>
    {
      const spy = vi.spyOn(CPF, 'create').mockReturnValue(fakeCPF2);
      const result = factoryInstance.create(fakeCPF1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeCPF1);
      expect(result.value).toBe(fakeCPF2.value);

      spy.mockRestore();
    });
  });
}
