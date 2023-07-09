import { rest } from "msw";

import users from "../stubs/users.json";

export const usersHandlers = [
  rest.get("/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(users));
  }),
];
