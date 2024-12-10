import { AmountPipe } from './amount.pipe';

describe('AmountPipe', () => {

  it('create an instance', () => {
    const pipe = new AmountPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return a string divided into digits when chars are less than 7', () => {
    const pipe = new AmountPipe();
    const initial = 607854;
    const expected = '607 854';

    const result = pipe.transform(initial);

    expect(result).toBe(expected);
  });

  it('Should return a floating-point string with the letter K when chars are more than 7', () => {
    const pipe = new AmountPipe();
    const initial = 1607854;
    const initial2 = 134607854;
    const initial3 = 2134607854;
    const expected = '1 607,9 К';
    const expected2 = '134 607,9 К';
    const expected3= '2 134 607,9 К';

    const result = pipe.transform(initial);
    const result2 = pipe.transform(initial2);
    const result3 = pipe.transform(initial3);

    expect(result).toBe(expected);
    expect(result2).toBe(expected2);
    expect(result3).toBe(expected3);
  });

});
