import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const createUser = new Elysia().post(
  "/create-user",
  async ({ body, set }) => {
    const { name, email, products } = body;

    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length > 0) {
      set.status = 400;
      return "User already exists";
    }

    await db.insert(users).values({ name, email, products });

    set.status = 201;
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
      products: t.Array(t.String()),
    }),
  }
);
