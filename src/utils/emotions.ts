import { Emotion } from '../types/calculator';

export const getNumberEmotion = (num: number): Emotion => {
  if (num >= 10000) {
    return {
      emoji: "🤯",
      color: "#FF9999",
      message: "와! 너무 큰 숫자야!"
    };
  } else if (num === 125) {
    return {
      emoji: "🥳",
      color: "#FFD700",
      message: "HDB Evan!"
    };
  } else if (num === 7 || num === 77 || num === 777 || num === 7777 || num === 77777 || num === 777777 || num === 7777777) {
    return {
      emoji: "🍀",
      color: "#90EE90",
      message: "오늘 정말 럭키잖아!"
    };
  } else if (num >= 1000) {
    return {
      emoji: "😱",
      color: "#FFB366",
      message: "매우 놀란 숫자야!"
    };
  } else if (num >= 100) {
    return {
      emoji: "😮",
      color: "#FFD700",
      message: "놀라운 숫자야!"
    };
  } else if (num >= 10) {
    return {
      emoji: "🤔",
      color: "#90EE90",
      message: "관심을 보이는 숫자야!"
    };
  } else if (num > 0) {
    return {
      emoji: "😊",
      color: "#90EE90",
      message: "좋은 숫자야!"
    };
  } else if (num < 0) {
    return {
      emoji: "😢",
      color: "#FF6347",
      message: "슬픈 숫자야..."
    };
  } else {
    return {
      emoji: "😶",
      color: "#A9A9A9",
      message: "영이네요!"
    };
  }
};

export const getOperatorEmotion = (operator: string): Emotion => {
  switch (operator) {
    case "+":
      return {
        emoji: "🤗",
        color: "#60A5FA",
        message: "더하기 할게요!"
      };
    case "-":
      return {
        emoji: "😟",
        color: "#FF6347",
        message: "걱정스러운 숫자야..."
      };
    case "*":
      return {
        emoji: "🤩",
        color: "#FFD700",
        message: "신나는 숫자야!"
      };
    case "/":
      return {
        emoji: "😰",
        color: "#FF9999",
        message: "긴장되는 숫자야..."
      };
    default:
      return {
        emoji: "😶",
        color: "#A9A9A9",
        message: "연산자 없음"
      };
  }
}; 