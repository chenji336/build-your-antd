import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('my first react test case', () => {
  const wrapped = render(<Button>Nice</Button>)
  const dom = wrapped.queryByText('Nice')
  expect(dom).toBeTruthy()
})