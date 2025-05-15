import { intensiveOperation } from "./functions";
import { client } from "./client";

async function services() {
  const agentsPath = require.resolve("./agents");
  try {
    await Promise.all([
      client.startService({
        agentsPath: agentsPath,
        functions: { intensiveOperation },
        resources: {
          targetCpuUsage: 0.8,
          targetMemoryUsage: 0.8,
        },
      }),
    ]);

    console.log("Services running successfully.");
  } catch (e) {
    console.error("Failed to run services", e);
  }
}

services().catch((err) => {
  console.error("Error running services:", err);
});
