import { Elysia } from "elysia";
import { createUser } from "./http/routes/create-user";

const app = new Elysia().use(createUser);

app.listen(3000, () => {
  console.log(`🦊 Elysia is running at PORT ${app.server?.port}`);
});
