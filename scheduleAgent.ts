import { client } from "./src/client";

export type InputSchedule = {
  name: string;
};

async function scheduleAgent(input: InputSchedule) {
  try {
    const agentId = `${Date.now()}-AgentChat`;
    const runId = await client.scheduleAgent({
      agentName: "agentChat",
      agentId,
      input,
    });

    const result = await client.getAgentResult({ agentId, runId });

    console.log("Agent result:", result);

    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error("Error scheduling agent:", error);
    process.exit(1); // Exit the process with an error code
  }
}

scheduleAgent({
  name: "test",
});
