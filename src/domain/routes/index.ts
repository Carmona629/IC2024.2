import { Elysia, t } from "elysia";
import { Controller } from "../controller";

export function routes() {
  const elysia = new Elysia();
  const controller = new Controller();
  elysia.post(
    "/",
    async ({ set }) => {
      const res = controller.postFile({
        esp_name: "esp",
        file_name: "file",
        file_hex: "hex",
      });
      set.status = typeof res === typeof Error ? 500 : 201;
      return res;
    },
    {
      body: t.Object({
        esp_name: t.String(),
        location: t.Nullable(t.String()),
        file_name: t.String(),
        file_hex: t.String(),
      }),
    }
  );
  elysia.get("/", async ({ set }) => {}, {
    body: t.Object({
      id: t.Nullable(t.String()),
      name: t.Nullable(t.String()),
    }),
  });
  return elysia;
}
