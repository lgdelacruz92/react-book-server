import ChatInstance from "@/services/chat/chat.service";
import { ChatMessage } from "./chat-message";
import { ChatChannel } from "./chat-channel";
import { ChatUser } from "./chat-user";

export class ChatMember {
  userId: string;
  constructor(userId?: string) {
    this.userId = userId || "";
  }
  async queryMessages(): Promise<ChatMessage[]> {
    const chatMessageResponse = await ChatInstance.search(
      {
        members: {
          $in: [this.userId],
        },
      },
      { text: { $exists: true } },
      { limit: 100, offset: 0, sort: [{ updated_at: -1 }] }
    );
    return chatMessageResponse.results.map(({ message }) => {
      const { id, text, user, channel, created_at: createdAt } = message;
      if (!user || !user.id) {
        throw Error("User id cannot be empty.");
      }
      return new ChatMessage(
        id,
        text || "",
        new ChatUser(
          user.id,
          user?.role,
          user?.created_at,
          user?.updated_at,
          user?.last_active,
          user?.banned,
          user?.online
        ),
        new ChatChannel(channel?.id || ""),
        createdAt
      );
    });
  }
}
