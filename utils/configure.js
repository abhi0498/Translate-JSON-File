import ora from "ora";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

async function configure() {
  const spinner = ora({
    color: "yellow",
    text: "Installing Playwright",
  }).start();

  const { stdout } = await execAsync("npx playwright install");

  spinner.succeed("Successfully installed Playwright");
}

export default configure;
