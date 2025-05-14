# Restack Autoscaling Agent Example

A sample repository with an agent doing memory intensive operations

## Requirements

- **Node 20+**

## Start Restack

To start Restack, use the following Docker command:

```bash
docker run -d --pull always --name restack -p 5233:5233 -p 6233:6233 -p 7233:7233 -p 9233:9233 ghcr.io/restackio/restack:main
```

## Install dependencies and start services

```bash
npm install
npm run dev
```

This will start a Node.js app with Restack Services.
Your code will be running and syncing with Restack to execute agents.

## Run agents

### from UI

You can run agents from the UI by clicking the "Run" button.

![Run agents from UI](./chat_post.png)

### from API

You can run agents from the API by using the generated endpoint:

`POST http://localhost:6233/api/agents/agentMemoryIntensive`

### from any client

You can run agents with any client connected to Restack, for example:

```bash
npm schedule-agent
```

executes `scheduleAgent.ts` which will connect to Restack and execute the `agentMemoryIntensive` agent.

## Send events to the Agent

### from UI

You can send events like message or end from the UI.

![Send events from UI](./chat_put.png)

And see the events in the run:

![See events in UI](./chat_run.png)

### from API

You can send events to the agent by using the following endpoint:

`PUT http://localhost:6233/api/agents/AgentChat/:agentId/:runId`


You can send following payload

```json
{
  "eventName": "end"
}
```

to end the conversation with the agent.

### from any client

You can send event to the agent with any client connected to Restack, for example:

Modify agentId and runId in eventAgent.ts and then run:

```bash
pnpm event-agent
```

It will connect to Restack and send 2 events to the agent, one to generate another agent and another one to end the conversation.

## Deploy on Restack Cloud

To deploy the application on Restack, you can create an account at [https://console.restack.io](https://console.restack.io)

## Scaling on Restack cloud

This example is to showcase how Restack Cloud will handle autoscaling to handle operations for your agent. Once the app is deployed you can spawn several agents using the agent POST request on the Restack developer ui and then trigger the `agentEvent` event on each of the agents.

On Restack cloud console under the logs section, you will notice how more pods are spawned to handle the load.
