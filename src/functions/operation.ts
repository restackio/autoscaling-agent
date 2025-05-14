import { FunctionFailure, log } from "@restackio/ai/function";

const performIntensiveOperation = (): void => {
  const arraySize = 3000000;
  const arrays: number[][] = [];
  
  log.info('Starting intensive operation');
  

  for (let i = 0; i < 3; i++) {
    log.info(`Creating array ${i + 1}`);
    const arr = new Array(arraySize).fill(0).map((_, index) => index);
    arrays.push(arr);
  }
  
  // Process arrays one at a time with logging
  for (let i = 0; i < arrays.length; i++) {
    log.info('Sorting...');
    arrays[i].sort((a, b) => b - a);
    
    log.info('Mapping...');
    arrays[i] = arrays[i].map(x => x * x);
    
    log.info('Filtering...');
    arrays[i] = arrays[i].filter(x => x % 2 === 0);
  }
  
  log.info('Operation completed');
};

export const intensiveOperation = async (): Promise<boolean> => {
  try {
    performIntensiveOperation();
    return true;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error in intensive operation: ${error}`);
  }
};
