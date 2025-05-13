import { step } from "@restackio/ai/workflow";
import { childExecute } from "@restackio/ai/workflow";
import { agentMemoryIntensive } from "../agents/agent";
import * as functions from "../functions";

export async function loadTestWorkflow() {
   const operations = Array.from({ length: 10 }, async () =>  {
    const agentId = `${Date.now()}-AgentMemoryIntensive`;

    const data = await childExecute({
      child: agentMemoryIntensive,
      childId: `${Date.now()}-agentMemoryIntensive`,
      input: [],
    });
  });
  await Promise.all(operations);
}
