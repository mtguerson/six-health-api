import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://docker:docker@localhost:5432/six-health-db",
  },
} satisfies Config;
