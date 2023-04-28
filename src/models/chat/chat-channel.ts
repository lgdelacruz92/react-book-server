import { ChatChannelMemberResponse } from "./chat-channel-member-response";
import ChatInstance from "@/services/stream-chat/stream-chat-instance";

export class ChatChannel {
  public channelId: string;
  constructor(channelId: string) {
    this.channelId = channelId;
  }

  async getMembers(): Promise<ChatChannelMemberResponse> {
    const channel = ChatInstance.channel("messaging", this.channelId);
    try {
      const response = await channel.queryMembers({});
      return new ChatChannelMemberResponse(response.members);
    } catch (e) {
      throw Error(`Could not query members\nReason: ${e}`);
    }
  }
}
