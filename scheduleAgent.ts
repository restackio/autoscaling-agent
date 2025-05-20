import { client } from "./src/client";

export type InputSchedule = {
  name: string;
};

async function scheduleAgent(input: InputSchedule) {
  try {
    const agentId = `${Date.now()}-AgentScaling`;

    const scheduledAgent = await client.scheduleAgent({
      agentName: "agentScaling",
      agentId,
      input,
      event: {
        name: "agentEvent",
      },
    });
    console.log("Agent scheduled:", scheduledAgent);

    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error("Error scheduling agent:", error);
    process.exit(1); // Exit the process with an error code
  }
}

scheduleAgent({
  name: "test",
});
