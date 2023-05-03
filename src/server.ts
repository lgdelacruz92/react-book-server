import express from "express";
import cors from "cors";

import { createUser, getUser } from "./controllers/user.controllers";
import { userChat } from "./webhooks/user-chat";
import { postChatToken, postCreateChat } from "./controllers/chat.controllers";
import { stripeRoutes } from "./routes";

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.post("/api/webhook/user-chat", userChat);

// user
app.post("/api/user/create", createUser);
app.get("/api/user/get/:authUserId", getUser);

app.post("/api/chat/token", postChatToken);
app.post("/api/chat/create", postCreateChat);

app.use("/api/stripe", stripeRoutes);

export { app };

if (process.env.LOCAL_DEBUGGING === "true") {
  const port = 5000;
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
}
