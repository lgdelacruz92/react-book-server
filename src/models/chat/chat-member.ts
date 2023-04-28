import ChatInstance from "@/services/stream-chat/stream-chat-instance";
import { ChatMessage } from "./chat-message";
import { ChatChannel } from "./chat-channel";

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
      const { id, text, user, channel } = message;
      return new ChatMessage(
        id,
        text || "",
        user,
        new ChatChannel(channel?.id || "")
      );
    });
  }
}
