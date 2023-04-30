import ChatInstance from "@/services/stream-chat/chat-instance";
import { ChatMessage } from "./chat-message";
import { ChatChannel } from "./chat-channel";
import { ChatUser } from "./chat-user";

export class ChatMember {
  user_id: string;
  constructor(user_id?: string) {
    this.user_id = user_id || "";
  }
  async queryMessages(): Promise<ChatMessage[]> {
    const chatMessageResponse = await ChatInstance.search(
      {
        members: {
          $in: [this.user_id],
        },
      },
      { text: { $exists: true } },
      { limit: 100, offset: 0, sort: [{ updated_at: -1 }] }
    );
    return chatMessageResponse.results.map(({ message }) => {
      const { id, text, user, channel, created_at } = message;
      if (!user || !user.id) {
        throw Error(`User id cannot be empty.`);
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
        created_at
      );
    });
  }
}
