import { strToExpressionArray, infixToSuffix, evaluate } from '../compute';

it('converts a string to an array representing an infix expression', () => {
  const str = '123*10/(1+2)';
  expect(strToExpressionArray(str)).toEqual(['123', '*', '10', '/', '(', '1', '+', '2', ')']);
});

// 123 * 10 / (1 + 2)

it('converts an infix expression to a postfix expression', () => {
  const infix = ['123', '*', '10', '/', '(', '1', '+', '2', ')'];
  const postfix = ['123', '10', '*', '1', '2', '+', '/']
  expect(infixToSuffix(infix)).toEqual(postfix);
});

it('correctly evaluates an infix expression', () => {
  const infix = ['123', '*', '10', '/', '(', '1', '+', '2', ')'];
  expect(evaluate(infix)).toEqual(410);
})