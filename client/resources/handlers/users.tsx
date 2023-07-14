import { rest } from "msw";

import users from "../stubs/users.json";

export const usersHandlers = [
  rest.get("/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(users));
  }),
  rest.get("/users/:uid", (req, res, ctx) => {
    const { uid } = req.params;
    const selectedUser = users.users.find((u) => u.id === uid);
    return res(ctx.status(200), ctx.delay(500), ctx.json(selectedUser));
  }),
  rest.put("/users/:uid", (req, res, ctx) => {
    const { uid } = req.params;
    const selectedUser = users.users.find((u) => u.id === uid);
    return res(ctx.status(200), ctx.delay(500), ctx.json(selectedUser));
  }),
];
