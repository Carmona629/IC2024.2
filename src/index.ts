import { Elysia } from "elysia";
import { routes } from "./domain/routes";

const app = new Elysia();
app.use(routes());

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});