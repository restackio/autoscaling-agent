import {
  defineEvent,
  onEvent,
  condition,
  log,
  step,
} from "@restackio/ai/agent";
import * as functions from "../functions";

export type EndEvent = {
  end: boolean;
};

export const memoryIntensiveOperationEvent = defineEvent<boolean>("memoryIntensiveOperation");
export const endEvent = defineEvent("end");

type AgentMemoryIntensiveOutput = {
  memoryIntensiveOperationDone: boolean;
};

export async function agentMemoryIntensive(): Promise<AgentMemoryIntensiveOutput> {
  let endReceived = false;
  let memoryIntensiveOperationDone = false;

  onEvent(memoryIntensiveOperationEvent, async () => {
    const operations = Array.from({ length: 10 }, () => 
      step<typeof functions>({}).memoryIntenstiveOperation()
    );
    await Promise.all(operations);
    
    memoryIntensiveOperationDone = true;
    return true;
  });

  onEvent(endEvent, async () => {
    endReceived = true;
  });

  await condition(() => endReceived);

  log.info("end condition met");
  return { memoryIntensiveOperationDone };
}
