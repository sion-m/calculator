'use client'

import { useState } from 'react';
import { CalculatorState, Operation } from '../types/calculator';
import { calculate } from '../utils/calculations';
import { getNumberEmotion, getOperatorEmotion } from '../utils/emotions';
import '../styles/Calculator.css';

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    currentNumber: "0",
    previousNumber: "",
    operation: null,
    history: [],
    isPositive: true,
    brackets: [],
    shouldResetScreen: false,
    emotion: getNumberEmotion(0)
  });

  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);

  const handleNumberClick = (num: string) => {
    if (state.shouldResetScreen) {
      setState({
        ...state,
        currentNumber: num,
        shouldResetScreen: false,
        emotion: getNumberEmotion(Number(num))
      });
      return;
    }

    const newNumber = state.currentNumber === "0" ? num : state.currentNumber + num;
    setState({
      ...state,
      currentNumber: newNumber,
      emotion: getNumberEmotion(Number(newNumber))
    });
  };

  const handleOperationClick = (operation: Operation) => {
    if (state.currentNumber === 'Error') return;

    const currentEmotion = getOperatorEmotion(operation!);

    if (state.previousNumber && state.operation) {
      const result = calculate(state.previousNumber, state.currentNumber, state.operation);
      setState({
        ...state,
        currentNumber: result,
        previousNumber: `${state.previousNumber} ${state.operation} ${state.currentNumber}`,
        operation: operation,
        shouldResetScreen: true,
        emotion: currentEmotion
      });
    } else {
      setState({
        ...state,
        operation: operation,
        previousNumber: state.currentNumber,
        shouldResetScreen: true,
        emotion: currentEmotion
      });
    }
  };

  const handleEquals = () => {
    if (!state.operation || !state.previousNumber) return;

    const result = calculate(state.previousNumber, state.currentNumber, state.operation);
    const newHistory = {
      expression: `${state.previousNumber} ${state.operation} ${state.currentNumber}`,
      result: result,
      timestamp: new Date()
    };

    const finalEmotion = getNumberEmotion(Number(result));

    setState({
      ...state,
      currentNumber: result,
      previousNumber: `${state.previousNumber} ${state.operation} ${state.currentNumber}`,
      operation: null,
      history: [...state.history, newHistory],
      shouldResetScreen: true,
      emotion: finalEmotion
    });
  };

  const handleToggleSign = () => {
    const newNumber = (parseFloat(state.currentNumber) * -1).toString();
    setState({
      ...state,
      currentNumber: newNumber,
      isPositive: !state.isPositive,
      emotion: getNumberEmotion(Number(newNumber))
    });
  };

  const handleBracket = (bracket: '(' | ')') => {
    setState({
      ...state,
      brackets: [...state.brackets, bracket]
    });
  };

  const handleClear = () => {
    setState({
      ...state,
      currentNumber: "0",
      previousNumber: "",
      operation: null,
      brackets: [],
      emotion: getNumberEmotion(0)
    });
  };

  const handleDeleteHistory = (index: number) => {
    const newHistory = state.history.filter((_, i) => i !== index);
    setState({
      ...state,
      history: newHistory
    });

    if (newHistory.length === 0) {
      setIsHistoryVisible(false);
    }
  };

  const handleClearHistory = () => {
    setState({
      ...state,
      history: []
    });
    setIsHistoryVisible(false);
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="previous">
          {state.previousNumber} {state.operation}
        </div>
        <div className="current">
          {state.currentNumber}
        </div>
        <div className="emotion" style={{ color: state.emotion.color }}>
          <span className="emoji">{state.emotion.emoji}</span>
          <p className="message">{state.emotion.message}</p>
        </div>
      </div>

      <div className="calculator-buttons">
        <button className="clear" onClick={handleClear}>AC</button>
        <button className="operation" onClick={() => handleBracket('(')}>(</button>
        <button className="operation" onClick={() => handleBracket(')')}>)</button>
        <button className="operation" onClick={() => handleOperationClick('%')}>%</button>

        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button className="operation" onClick={() => handleOperationClick('/')}>/</button>

        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button className="operation" onClick={() => handleOperationClick('*')}>×</button>

        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button className="operation" onClick={() => handleOperationClick('-')}>−</button>

        <button className="operation" onClick={handleToggleSign}>±</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={() => handleNumberClick('.')}>.</button>
        <button className="operation" onClick={() => handleOperationClick('+')}>+</button>

        <button onClick={handleEquals} className="equals" style={{gridColumn: '1 / -1'}}>=</button>
      </div>

      <div className="calculator-history">
        <h3 onClick={() => setIsHistoryVisible(!isHistoryVisible)} style={{ cursor: 'pointer' }}>
          계산 기록 {isHistoryVisible ? '▲' : '▼'}
        </h3>
        {isHistoryVisible && (
          <div className="history-list">
            {state.history.length > 0 && state.history.map((item, index) => (
              <div key={index} className="history-item" onClick={() => {
                setState({
                  ...state,
                  currentNumber: item.result,
                  previousNumber: item.expression.split('=')[0].trim(),
                  operation: null,
                  emotion: getNumberEmotion(Number(item.result))
                });
              }}>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteHistory(index); }} style={{ fontSize: '0.8rem', color: '#FF6B6B', marginRight: '5px' }}>x</button>
                <span>{item.expression} = {item.result}</span>
                <small style={{ marginLeft: 'auto' }}>{item.timestamp.toLocaleTimeString()}</small>
              </div>
            ))}
            {state.history.length > 0 && (
              <button onClick={handleClearHistory} style={{ marginTop: '10px', cursor: 'pointer', color: '#3B82F6', fontSize: '0.9rem' }}>모두 지우기</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 