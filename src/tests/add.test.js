/* eslint-disable no-undef */
// @ts-ignore
const nameGenerator = name => `hello from ${name}!`;
test('should print name',
  () => {
    const name = nameGenerator('yakir');
    expect(name).toBe('hello from yakir!');
  });
