import { FunctionFailure, log } from "@restackio/ai/function";

const logMemoryUsage = () => {
  const used = process.memoryUsage();
  log.info('Memory usage:', {
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
    rss: `${Math.round(used.rss / 1024 / 1024)}MB`
  });
};

const performMemoryIntensiveOperation = (): void => {
  const arraySize = 3000000;
  const arrays: number[][] = [];
  
  log.info('Starting memory-intensive operation');
  logMemoryUsage();

  for (let i = 0; i < 3; i++) {
    log.info(`Creating array ${i + 1}`);
    const arr = new Array(arraySize).fill(0).map((_, index) => index);
    arrays.push(arr);
    logMemoryUsage();
  }
  
  // Process arrays one at a time with logging
  for (let i = 0; i < arrays.length; i++) {
    log.info('Sorting...');
    arrays[i].sort((a, b) => b - a);
    logMemoryUsage();
    
    log.info('Mapping...');
    arrays[i] = arrays[i].map(x => x * x);
    logMemoryUsage();
    
    log.info('Filtering...');
    arrays[i] = arrays[i].filter(x => x % 2 === 0);
    logMemoryUsage();
  }
  
  log.info('Operation completed');
  logMemoryUsage();
};

export const memoryIntenstiveOperation = async (): Promise<boolean> => {
  try {
    performMemoryIntensiveOperation();
    return true;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error in memory-intensive operation: ${error}`);
  }
};
