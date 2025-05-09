import Elysia from "elysia";

export const cartpanda = new Elysia().post(
  "/cartpanda",
  async ({ body }: any) => {
    console.log(
      "Payload recebido:",
      body.order.customer.first_name,
      body.order.email,
      body.order.line_items.map((item: any) => item.title)
    );
  }
);
