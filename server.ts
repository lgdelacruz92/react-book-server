import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import { chapters } from "./chapters/chapters";
import cors from "cors";
import { findInChapter } from "./utils/find-section";
import bodyParser from "body-parser";

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

app.get("/api/chatgpt", (req: Request, res: Response) => {
  const payload = req.body;
});

const port = 3003;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
