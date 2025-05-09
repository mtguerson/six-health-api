import { Elysia } from "elysia";
import { createUser } from "./http/routes/create-user";
import { signIn } from "./http/routes/sign-in";

const app = new Elysia().use(createUser).use(signIn);

app.listen(3000, () => {
  console.log(`🦊 Elysia is running at PORT ${app.server?.port}`);
});
