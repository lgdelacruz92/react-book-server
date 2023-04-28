import { StreamChat } from "stream-chat";
import { ChannelMembersResponse } from "@/types/stream-chat/stream-chat.types";
require("dotenv").config();

const streamChatInstance = StreamChat.getInstance(
  process.env.STREAMCHAT_KEY || "",
  process.env.STREAMCHAT_SECRET || ""
);

const AppStreamChat = {
  instance: streamChatInstance,
  getChannelMembers: async (channelId): Promise<ChannelMembersResponse> => {
    const channel = streamChatInstance.channel("messaging", channelId);
    try {
      const response = await channel.queryMembers({});
      return { ...response };
    } catch (e) {
      throw Error(`Could not query members\nReason: ${e}`);
    }
  },
};

export default AppStreamChat;
