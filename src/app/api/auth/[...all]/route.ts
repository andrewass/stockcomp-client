import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/auth.ts";

export const { POST, GET } = toNextJsHandler(auth);
