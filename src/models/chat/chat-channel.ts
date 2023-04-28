import { ChatChannelMemberResponse } from "./chat-channel-member-response";
import ChatInstance from "@/services/stream-chat/chat-instance";
import { ChatMessage } from "./chat-message";

export class ChatChannel {
  public channelId: string;
  constructor(channelId: string) {
    this.channelId = channelId;
  }

  get instance() {
    return ChatInstance.channel("messaging", this.channelId);
  }

  async getMembers(): Promise<ChatChannelMemberResponse> {
    const channel = this.instance;
    try {
      const response = await channel.queryMembers({});
      return new ChatChannelMemberResponse(response.members);
    } catch (e) {
      throw Error(`Could not query members\nReason: ${e}`);
    }
  }

  async addMember(userId: string): Promise<ChatChannelMemberResponse> {
    const channel = this.instance;
    try {
      const response = await channel.addMembers([userId]);
      return new ChatChannelMemberResponse(response.members);
    } catch (e) {
      throw Error(`Could not add member\nReason: ${e}`);
    }
  }

  async addMembers(userIds: string[]): Promise<ChatChannelMemberResponse> {
    const channel = this.instance;
    try {
      const response = await channel.addMembers(userIds);
      return new ChatChannelMemberResponse(response.members);
    } catch (e) {
      throw Error(`Could not add member\nReason: ${e}`);
    }
  }

  async isMember(userId: string): Promise<boolean> {
    const { members } = await this.getMembers();
    const findMemberResult = members.filter(
      (member) => member.user_id === userId
    );
    return findMemberResult.length > 0;
  }

  async getChannelMessages(): Promise<ChatMessage[]> {
    const { members } = await this.getMembers();
    const memberMessages = members.map(
      async (member) => await member.queryMessages()
    );
    const userMessagesResults = await Promise.all(memberMessages);

    const chatMessages: ChatMessage[] = [];
    if (userMessagesResults.length === 0) {
      console.log(`There are no messages in this channel: ${this.channelId}`);
      return chatMessages;
    }

    for (let i = 0; i < userMessagesResults.length; i++) {
      for (let j = 0; j < userMessagesResults[0].length; j++) {
        chatMessages.push(userMessagesResults[i][j]);
      }
    }
    chatMessages.sort(
      (a, b) =>
        new Date(a.created_at || "").getTime() -
        new Date(b.created_at || "").getTime()
    );
    return chatMessages;
  }
}
