import { ChatChannel } from "./chat-channel";
import { ChatUser } from "./chat-user";

export class ChatMessage {
  id: string;
  text: string;
  user?: ChatUser | null;
  channel?: ChatChannel | null;
  createdAt?: string | null;
  constructor(
    id: string,
    text: string,
    user?: ChatUser | null,
    channel?: ChatChannel | null,
    createdAt?: string | null
  ) {
    this.id = id;
    this.text = text;
    this.user = user;
    this.channel = channel;
    this.createdAt = createdAt;
  }
}
