import ChatInstance from "@/services/stream-chat/chat-instance";
import { ChatChannel } from "./chat-channel";

export class ChatUser {
  id: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  lastActive?: string;
  banned?: boolean;
  online?: boolean;
  constructor(
    id: string,
    role?: string,
    createdAt?: string,
    updatedAt?: string,
    lastActive?: string,
    banned?: boolean,
    online?: boolean
  ) {
    this.id = id;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastActive = lastActive;
    this.banned = banned;
    this.online = online;
  }

  get json() {
    return {
      id: this.id,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastActive: this.lastActive,
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
