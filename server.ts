import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import { chapters } from "./chapters/chapters";
import cors from "cors";
import { findInChapter } from "./utils/find-section";
import bodyParser from "body-parser";
import { postChat } from "./services/api/chatgpt";
import { StreamChat } from "stream-chat";

require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.get("/api/chapters", (req: Request, res: Response) => {
  res.json(chapters);
});

app.get("/api/chapters/:fileName", (req: Request, res: Response) => {
  const sectionMarkdownText = fs.readFileSync(
    `./chapters/${req.params.fileName}.txt`,
    "utf-8"
  );
  const sectionInfo = findInChapter(chapters, req.params.fileName);
  res.json({
    title: sectionInfo.title,
    content: sectionMarkdownText,
    fileName: sectionInfo.fileName,
  });
});

app.post("/api/chatgpt", async (req: Request, res: Response) => {
  const { messages } = req.body;
  try {
    const response = await postChat({
      model: "gpt-3.5-turbo",
      messages,
    });
    res.setHeader("Content-Type", "application/json");
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/api/streamchat", async (req: Request, res: Response) => {
  const { user } = req.body;
  const serverClient = StreamChat.getInstance(
    process.env.STREAMCHAT_KEY || "",
    process.env.STREAMCHAT_SECRET || ""
  );
  res.json({ token: serverClient.createToken(user) });
});

const port = 3003;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
