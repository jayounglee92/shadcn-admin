import { add } from './math'

test('add 함수는 두 숫자의 합을 반환합니다.', () => {
  expect(add(1, 2)).toBe(3)
  expect(add(-1, 1)).toBe(0)
  expect(add(0, 0)).toBe(0)
})
