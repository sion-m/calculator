export type Operation = '+' | '-' | '*' | '/' | '%' | null;

export type Emotion = {
  emoji: string;
  color: string;
  message: string;
};

export type CalculatorState = {
  currentNumber: string;
  previousNumber: string;
  operation: Operation;
  history: CalculationHistory[];
  isPositive: boolean;
  brackets: string[];
  shouldResetScreen: boolean;
  emotion: Emotion;
};

export type CalculationHistory = {
  expression: string;
  result: string;
  timestamp: Date;
}; 