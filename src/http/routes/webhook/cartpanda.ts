import Elysia, { StatusMap } from "elysia";
import { userService } from "../../../services/user";
import { WebhookPayload } from "../../../types/cartpanda";
import { HTTPHeaders } from "elysia/dist/types";
import { ElysiaCookie } from "elysia/dist/cookies";

export const cartpanda = new Elysia().post(
  "/cartpanda",
  async ({
    body,
    set,
  }: {
    body: WebhookPayload;
    set: {
      headers: HTTPHeaders;
      status?: number | keyof StatusMap;
      redirect?: string;
      cookie?: Record<string, ElysiaCookie>;
    };
  }) => {
    try {
      const { order } = body as WebhookPayload;
      const { customer, email, line_items } = order;

      const result = await userService.createUser({
        name: customer.first_name,
        email: email,
        products: line_items.map((item: any) => item.title),
      });

      if (result.exists) {
        set.status = result.status;
        return { message: "User already exists" };
      }

      set.status = result.status;
      return { message: "User created successfully", user: result.user };
    } catch (error) {
      console.error("Error processing webhook:", error);
      set.status = 500;
      return { error: "Internal server error" };
    }
  }
);
