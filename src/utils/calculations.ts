import { Operation } from '../types/calculator';

export const calculate = (prev: string, current: string, operation: Operation): string => {
  const p = parseFloat(prev);
  const c = parseFloat(current);

  if (isNaN(p) || isNaN(c)) return current;

  let result: number;
  switch (operation) {
    case '+':
      result = p + c;
      break;
    case '-':
      result = p - c;
      break;
    case '*':
      result = p * c;
      break;
    case '/':
      if (c === 0) return 'Error';
      result = p / c;
      break;
    case '%':
      result = (p * c) / 100;
      break;
    default:
      return current;
  }

  return result.toString();
};

export const evaluateBrackets = (expression: string[]): string => {
  // 괄호 내부 계산 로직
  return expression.join('');
};