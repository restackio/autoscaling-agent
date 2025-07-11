import {
  defineEvent,
  onEvent,
  condition,
  log,
  step,
  agentContinueAsNew,
} from "@restackio/ai/agent";
import * as functions from "../functions";

export type EndEvent = {
  end: boolean;
};

export const agentEvent = defineEvent<boolean>("agentEvent");
export const endEvent = defineEvent("end");

type AgentOperation = {
  intensiveOperationDone: boolean;
};

export async function agentScaling(): Promise<AgentOperation> {
  let endReceived = false;
  let intensiveOperationDone = false;

  onEvent(agentEvent, async () => {
    const operations = Array.from({ length: 100 }, () =>
      step<typeof functions>({
        retry: { maximumAttempts: 10 },
      }).intensiveOperation()
    );
    await Promise.allSettled(operations);

    intensiveOperationDone = true;
    return true;
  });

  onEvent(endEvent, async () => {
    endReceived = true;
  });

  await condition(() => endReceived);

  if (!endReceived) {
    await agentContinueAsNew();
  }

  log.info("end condition met");
  return { intensiveOperationDone };
}
