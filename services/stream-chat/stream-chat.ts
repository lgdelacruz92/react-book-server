import { StreamChat } from "stream-chat";
require("dotenv").config();

const streamChatInstance = StreamChat.getInstance(
  process.env.STREAMCHAT_KEY || "",
  process.env.STREAMCHAT_SECRET || ""
);

const AppStreamChat = {
  instance: streamChatInstance,
  getChannelMembers: async (channelId) => {
    const channel = streamChatInstance.channel("messaging", channelId);
    try {
      return await channel.queryMembers({});
    } catch (e) {
      throw Error(`Could not query members\nReason: ${e}`);
    }
  },
};

export default AppStreamChat;
