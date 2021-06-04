import { writeNumber } from '../Writing/attributeWriters';

describe('BZW Attribute Writer functions', () => {
  const values: [number, string][] = [
    [20.0, '20'],
    [1.25, '1.25'],
    [1.123456789, '1.123457'], // because of rounding
  ];

  values.forEach(([actual, expected]) => {
    it(`should correctly write ${actual} as ${expected}`, () => {
      expect(writeNumber(actual)).toEqual(expected);
    });
  });
});
