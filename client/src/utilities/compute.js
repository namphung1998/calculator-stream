export const strToExpressionArray = (str) => {
  const res = [];
  let i = 0
  let current = '';

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (!isNaN(c)) {
      current += c;
    } else {
      if (current.length > 0) {
        res.push(current);
        current = '';
      }
      res.push(c);
    }
  }

  if (current.length > 0) res.push(current);

  return res;
}

const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
}

const calculate = (a, b, op) => {
  return OPERATIONS[op](a, b);
};

const precedence = c => {
  if (c === '+' || c === '-') {
    return 1;
  } else if (c === '*' || c === '/') {
    return 2;
  }
  
  return 0;
}

export const infixToSuffix = str => {
  // str is a list of strings, representing the operands and the operators
  const stack = [];
  const res = [];

  for (let i = 0; i < str.length; i += 1) {
    const c = str[i];
    if (!isNaN(c)) {
      res.push(c);
    } else if (c === '(') {
      stack.push(c);
    } else if (c == ')') {
      while (stack.length !== 0 && stack[stack.length - 1] !== '(') {
        res.push(stack.pop());
      }
      stack.pop();
    } else {
      while (stack.length !== 0 && precedence(c) <= precedence(stack[stack.length - 1])) {
        res.push(stack.pop());
      }

      stack.push(c);
    }
  }

  while (stack.length !== 0) {
    res.push(stack.pop());
  }

  return res;
}

export const evaluate = expression => {
  const suffix = infixToSuffix(expression);
  const stack = [];

  for (let i = 0; i < suffix.length; i++) {
    const c = suffix[i];
    if (!isNaN(c)) {
      stack.push(parseInt(c));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(calculate(a, b, c));
    }
  }

  return stack.pop();
}
