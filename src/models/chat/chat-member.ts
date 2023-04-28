import ChatInstance from "@/services/stream-chat/stream-chat-instance";

export class ChatMember {
  user_id: string;
  constructor(user_id?: string) {
    this.user_id = user_id || "";
  }
  async queryMessages(): Promise<any> {
    return await ChatInstance.search(
      {
        members: {
          $in: [this.user_id],
        },
      },
      { text: { $exists: true } },
      { limit: 100, offset: 0, sort: [{ updated_at: -1 }] }
    );
  }
}
