import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import log from "./logger";
import cors from "cors";
import session from "express-session";

const appRouter = trpc.router();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const SESSION_SECRET = process.env.SESSION_SECRET || "devSecret";
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
  })
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.use(
  session({
    name: "qid",
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Home Routes");
});

app.listen(PORT, () => {
  log.info(`Server is listening at: http://${HOST}:${PORT}`);
});
