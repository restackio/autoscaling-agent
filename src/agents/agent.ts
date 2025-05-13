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

type AgentChatOutput = {
  memoryIntensiveOperationDone: boolean;
};

export async function agentChat(): Promise<AgentChatOutput> {
  let endReceived = false;
  let memoryIntensiveOperationDone = false;

  onEvent(memoryIntensiveOperationEvent, async () => {
    const result = await step<typeof functions>({}).memoryIntenstiveOperation();
    memoryIntensiveOperationDone = result;
    return result;
  });

  onEvent(endEvent, async () => {
    endReceived = true;
  });

  // We use the ` condition` function to wait for the event goodbyeReceived to return `True`.
  await condition(() => endReceived);

  log.info("end condition met");
  return { memoryIntensiveOperationDone };
}
