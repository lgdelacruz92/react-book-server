import ChatInstance from "@/services/stream-chat/chat-instance";

type CreateChannelOptions = {
  name?: string;
  members?: string[];
};

class ChatChannelsManager {
  async createChannel(
    type: string,
    title: string,
    options?: CreateChannelOptions
  ) {
    const channel = ChatInstance.channel(type, title, options);
    await channel.create();
  }
}

export default ChatChannelsManager;