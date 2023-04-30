import ChatInstance from "@/services/stream-chat/chat-instance";
import { ChatChannel } from "./chat-channel";

export class ChatUser {
  id: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  last_active?: string;
  banned?: boolean;
  online?: boolean;
  constructor(
    id: string,
    role?: string,
    created_at?: string,
    updated_at?: string,
    last_active?: string,
    banned?: boolean,
    online?: boolean
  ) {
    this.id = id;
    this.role = role;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.last_active = last_active;
    this.banned = banned;
    this.online = online;
  }

  get json() {
    return {
      id: this.id,
      role: this.role,
      created_at: this.created_at,
      updated_at: this.updated_at,
      last_active: this.last_active,
      banned: this.banned,
      online: this.online,
    };
  }

  async getChannels(): Promise<ChatChannel[]> {
    const channels = await ChatInstance.queryChannels({
      members: { $in: [this.id] },
    });

    return channels.map((channel) => new ChatChannel(channel.id || ""));
  }
}
