import { StreamChat } from "stream-chat";
import { AppStreamChatChannelMemberResponse } from "@/types/stream-chat/stream-chat.types";
require("dotenv").config();

const streamChatInstance = StreamChat.getInstance(
  process.env.STREAMCHAT_KEY || "",
  process.env.STREAMCHAT_SECRET || ""
);

const AppStreamChat = {
  instance: streamChatInstance,
  getChannelMembers: async (
    channelId: string
  ): Promise<AppStreamChatChannelMemberResponse> => {
    const channel = streamChatInstance.channel("messaging", channelId);
    try {
      const response = await channel.queryMembers({});
      return new AppStreamChatChannelMemberResponse(response.members);
    } catch (e) {
      throw Error(`Could not query members\nReason: ${e}`);
    }
  },
};

export default AppStreamChat;
