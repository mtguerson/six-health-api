import { db } from "../db/connection";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

interface CreateUserParams {
  name: string;
  email: string;
  products?: string[];
}

export const userService = {
  async createUser({ name, email, products }: CreateUserParams) {
    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length > 0) {
      return { exists: true, user: user[0], status: 400 };
    }

    const newUser = await db.insert(users).values({ name, email, products });
    return { exists: false, user: newUser, status: 201 };
  },
};
