import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import { users } from "../../db/schema";

export const signIn = new Elysia().post(
  "/sign-in",
  async ({ body, set }) => {
    const { email } = body;

    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      set.status = 403;
      return "User does not have access";
    }

    set.status = 200;
    return { id: user[0].id };
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
    }),
  }
);
