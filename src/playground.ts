import { ChatChannel } from "./models/chat/chat-channel";

const main = async () => {
  const channel = new ChatChannel("028aa002-6f75-4f19-8cf1-22b245039301");
  const channelMessages = await channel.getChannelMessages();
  channelMessages.forEach((message) => console.log(message));
};
main();
