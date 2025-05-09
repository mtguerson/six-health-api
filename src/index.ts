import { Elysia } from "elysia";
import { createUser } from "./http/routes/create-user";
import { signIn } from "./http/routes/sign-in";
import { getUser } from "./http/routes/get-user";

const app = new Elysia().use(createUser).use(signIn).use(getUser);

app.listen(3000, () => {
  console.log(`🦊 Elysia is running at PORT ${app.server?.port}`);
});
