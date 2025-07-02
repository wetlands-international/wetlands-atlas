import fs from "fs";
import path from "path";

import dotenv from "dotenv";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const env = argv.env || argv.e || "development";

let dotenvFile;
if (env === "development") {
  dotenvFile = ".env";
} else {
  // This is needed to ensure a ssl connection for the database connection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.env as any).NODE_ENV = "production";
  dotenvFile = `.env.${env}`;
}
const dotenvPath = path.resolve(".", dotenvFile);
if (!fs.existsSync(dotenvPath)) {
  const errorMsg = `File not found: ${dotenvPath} for environment ${env}`;
  console.error(errorMsg);
  process.exit(1);
}
dotenv.config({ path: dotenvPath });

// Import payload and config after dotenv is configured
const { default: payload } = await import("payload");
const { default: config } = await import("../../app/src/payload.config");

const COUNTRIES_SQL_FILE_PATH = `../app-initial-data/countries_sahel.sql`;

const seed = async () => {
  await payload.init({ config: config });

  const db = payload.db.drizzle;

  await db.transaction(
    async (tx) => {
      const statements = (await fs.promises.readFile(COUNTRIES_SQL_FILE_PATH, "utf-8")).split(
        ";\n",
      );
      for (const statement of statements) {
        await tx.execute(statement);
      }
    },
    { isolationLevel: "read committed" },
  );

  // No method to shutdown payload gracefully. pool.end() hangs forever.
  process.exit(0);
};

void seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
