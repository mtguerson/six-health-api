import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getUser = new Elysia().get(
  "user/:id",
  async ({ params, set }) => {
    const user = await db.select().from(users).where(eq(users.id, params.id));

    if (user.length === 0) {
      set.status = 404;
      return "User not found";
    }

    set.status = 200;
    return user[0];
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);
