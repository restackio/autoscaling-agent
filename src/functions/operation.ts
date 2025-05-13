import { FunctionFailure, log } from "@restackio/ai/function";

const performMemoryIntensiveOperation = (): void => {
  const arraySize = 10000000;
  const arrays: number[][] = [];
  
  for (let i = 0; i < 5; i++) {
    const arr = new Array(arraySize).fill(0).map((_, index) => index);
    arrays.push(arr);
  }
  
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].sort((a, b) => b - a);
    arrays[i] = arrays[i].map(x => x * x);
    arrays[i] = arrays[i].filter(x => x % 2 === 0);
  }
};

export const memoryIntenstiveOperation = async (): Promise<boolean> => {
  try {
    performMemoryIntensiveOperation();
    return true;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error in memory-intensive operation: ${error}`);
  }
};
