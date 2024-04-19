import { execSync } from "child_process";

export default class AppService {
  executeNodeCodeSync(sourceCode: string) {
    try {
      sourceCode = JSON.parse(sourceCode);
      sourceCode = sourceCode.replace(/"/g, "'");

      const startTime = Date.now();
      const result = execSync(`node -e "${sourceCode}"`, { encoding: "utf-8" });

      const endTime = Date.now();
      const executionTime = endTime - startTime;
      console.log("Execution time:", executionTime, "milliseconds");

      return {
        output: result,
        executionTime: executionTime,
      };
    } catch (error) {
      // Handle errors if any
      console.error("Error executing Node.js code:", error);
      return null; // or throw error based on your requirement
    }
  }
}
