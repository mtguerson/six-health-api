import Elysia, { t } from "elysia";
import { userService } from "../../services/user";

export const createUser = new Elysia().post(
  "/create-user",
  async ({ body, set }) => {
    const { name, email, products } = body;

    const result = await userService.createUser({ name, email, products });

    if (result.exists) {
      set.status = 400;
      return "User already exists";
    }

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
