test('common', () => {
  expect(2 + 2).toBe(4)
})

test('boolean', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})

test('object', () => {
  expect({name: 'cj'}).toEqual({name: 'cj'}) // toBe 则为 false，相当于 Object.is
})