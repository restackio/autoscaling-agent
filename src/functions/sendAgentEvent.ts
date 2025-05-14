import { FunctionFailure } from "@restackio/ai/function";
import { client } from "../client"

import "dotenv/config";

export const sendAgentEvent = async ({
  eventName,
  eventInput,
  agentId,
  runId,
}: {
  eventName: string;
  eventInput: any;
  agentId: string;
  runId: string;
}) => {

  try {
  const sentEvent = await client.sendAgentEvent({
    event: {
      name: eventName,
      input: eventInput,
    },
    agent: {
      agentId: agentId,
      runId: runId,
    }
  })

  return sentEvent;

  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error sending agent event: ${error}`);
  }
};
