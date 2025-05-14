import { step } from "@restackio/ai/workflow";

import { sendAgentEvent } from "../functions/sendAgentEvent";
import * as functions from "../functions";

export async function loadTestWorkflow() {
  const agentId = `${Date.now()}-AgentMemoryIntensive`;
  const runId = `${Date.now()}-run-id`;

  await step<typeof functions>({}).sendAgentEvent({
    eventName: 'end',
    eventInput: {},
    agentId,
    runId,
  });

}
