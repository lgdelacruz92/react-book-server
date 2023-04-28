import { ChatChannel } from "./chat-channel";
import { ChatUser } from "./chat-user";

export class ChatMessage {
  id: string;
  text: string;
  user?: ChatUser | null;
  channel?: ChatChannel | null;
  constructor(
    id: string,
    text: string,
    user?: ChatUser | null,
    channel?: ChatChannel | null
  ) {
    this.id = id;
    this.text = text;
    this.user = user;
    this.channel = channel;
  }
}
