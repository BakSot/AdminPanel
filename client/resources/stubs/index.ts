import { setupWorker } from "msw";
import { usersHandlers } from "../handlers/users";

export const worker = setupWorker(...usersHandlers);

worker.start({ onUnhandledRequest: "bypass" });
