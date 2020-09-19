const Time = require('./');

const unixTime = 1600554656;
let time = new Time(unixTime);

test('getDay', () => {
  expect(time.getDay()).toBe('19');
});

test('getMonth', () => {
  expect(time.getMonth()).toBe('Sep');
});

test('getYear', () => {
  expect(time.getYear()).toBe('2020');
});

test('getHours', () => {
  expect(time.getHours()).toBe('22');
});

test('getMinutes', () => {
  expect(time.getMinutes()).toBe('30');
});