import { FunctionFailure, log } from "@restackio/ai/function";

const performMemoryIntensiveOperation = (): void => {

  const arraySize = 10000000;
  const arrays: number[][] = [];
  
  for (let i = 0; i < 8; i++) {
    const arr = new Array(arraySize).fill(0).map((_, index) => index);
    arrays.push(arr);
    const arrCopy = [...arr];
    arrays.push(arrCopy);
  }
  
  
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].sort((a, b) => b - a);
    arrays[i] = arrays[i].map(x => x * x);
    arrays[i] = arrays[i].filter(x => x % 2 === 0);
  
    const newArray = new Array(arraySize).fill(0).map((_, index) => arrays[i][index % arrays[i].length]);
    arrays.push(newArray);
  }
  
  const result = arrays.reduce((acc, arr) => acc + arr.length, 0);
  log.debug("Memory intensive operation completed", { result });
};


export const memoryIntenstiveOperation = async (): Promise<boolean> => {
  try {
    performMemoryIntensiveOperation();
    return true;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error in memory-intensive operation: ${error}`);
  }
};
