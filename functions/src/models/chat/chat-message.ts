import { ChatChannel } from "./chat-channel";
import { ChatUser } from "./chat-user";

export class ChatMessage {
  id: string;
  text: string;
  user?: ChatUser | null;
  channel?: ChatChannel | null;
  created_at?: string | null;
  constructor(
    id: string,
    text: string,
    user?: ChatUser | null,
    channel?: ChatChannel | null,
    created_at?: string | null
  ) {
    this.id = id;
    this.text = text;
    this.user = user;
    this.channel = channel;
    this.created_at = created_at;
  }
}
