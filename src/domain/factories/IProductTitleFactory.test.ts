import { beforeEach, describe, expect, it, vi } from "vitest";
import { IProductTitleFactory } from "./IProductTitleFactory";
import { ProductTitle, ProductTitleCreateValue } from "../value-objects/ProductTitle";
import { mockProductTitle } from "../value-objects/ProductTitle.mock";
import { faker } from "@faker-js/faker";
import { InvalidDataError } from "../errors";

type TestOptions = {
  getInstanceFunc: () => IProductTitleFactory;
}

export function testProductTitleFactory(opt: TestOptions)
{
  const factoryInstanceClassName = opt.getInstanceFunc().constructor.name;

  describe(`${factoryInstanceClassName} - IProductTitleFactory`, () =>
  {
    let factoryInstance: IProductTitleFactory;

    const fakeInstance1: ProductTitle = mockProductTitle();
    const fakeInstance2: ProductTitle = mockProductTitle();
    const invalidValue: ProductTitleCreateValue = faker.string.binary();

    beforeEach(() =>
    {
      factoryInstance = opt.getInstanceFunc();
    });

    it('should be created from a ProductTitle instance successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeInstance1);

      expect(testInstance).toBeInstanceOf(ProductTitle);
      expect(testInstance.value).toBe(fakeInstance1.value);
    });

    it('should be created from a string value successfully', () =>
    {
      const testInstance = factoryInstance.create(fakeInstance1.value);

      expect(testInstance).toBeInstanceOf(ProductTitle);
      expect(testInstance.value).toBe(fakeInstance1.value);
    });

    it('should throw for invalid values', () =>
    {
      expect(() => factoryInstance.create(invalidValue)).toThrow(InvalidDataError);
    });

    it('should call ProductTitle.create internally', () =>
    {
      const spy = vi.spyOn(ProductTitle, 'create').mockReturnValue(fakeInstance2);
      const result = factoryInstance.create(fakeInstance1);

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.lastCall![0]).toBe(fakeInstance1);
      expect(result.value).toBe(fakeInstance2.value);

      spy.mockRestore();
    });
  });
}
