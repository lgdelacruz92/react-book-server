import express, { Request, Response } from "express";
import cors from "cors";

import { userChat } from "./webhooks/user-chat";
import {
  authRoutes,
  chatRoutes,
  openAIRoutes,
  stripeRoutes,
  trelloRoutes,
  userRoutes,
} from "./routes";
import { AxiosError } from "axios";

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// todo: clean this later
app.post("/api/webhook/user-chat", userChat);

// user
app.use("/api/user", userRoutes);

// auth
app.use("/api/auth", authRoutes);

// chat
app.use("/api/chat", chatRoutes);

// stripe
app.use("/api/stripe", stripeRoutes);

// trello
app.use("/api/trello", trelloRoutes);

// open-ai
app.use("/api/open-ai", openAIRoutes);

type ServerError = {
  status?: number;
  message?: string;
};
// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, _: Request, res: Response) => {
  if (err instanceof AxiosError) {
    console.error(err);
  }
  const error: ServerError = {};
  if ("message" in err) {
    error.message = err.message;
  }
  if ("status" in err) {
    error.status = err.status;
  }
  res.status(error.status || 500).send(error.message);
});

export { app };

if (process.env.LOCAL_DEBUGGING === "true") {
  const port = 5000;
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
}
