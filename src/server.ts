import express from "express";
import cors from "cors";

import { userChat } from "./webhooks/user-chat";
import { authRoutes, chatRoutes, stripeRoutes, userRoutes } from "./routes";

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

export { app };

if (process.env.LOCAL_DEBUGGING === "true") {
  const port = 5000;
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
}
