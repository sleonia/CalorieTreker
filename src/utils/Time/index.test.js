const Time = require('./');

const unixTime = 1600554656;
let time = new Time(unixTime);

test('getDay', async () => {
  expect(await time.getDay()).toBe('19');
});

test('getMonth', async () => {
  expect(await time.getMonth()).toBe('Sep');
});

test('getYear', async () => {
  expect(await time.getYear()).toBe('2020');
});

test('getHours', async () => {
  expect(await time.getHours()).toBe('22');
});

test('getMinutes', async () => {
  expect(await time.getMinutes()).toBe('30');
});
