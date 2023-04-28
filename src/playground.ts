import { ChatChannel } from "./models/chat/chat-channel";

const main = async () => {
  const channel = new ChatChannel("028aa002-6f75-4f19-8cf1-22b245039301");
  const { members } = await channel.getMembers();
  const memberMessages = members.map(
    async (member) => await member.queryMessages()
  );
  const userMessagesResults = await Promise.all(memberMessages);
  userMessagesResults.forEach((userMessages) => {
    userMessages.results.forEach((result: any) => {
      console.log({ id: result.message.id, message: result.message.text });
    });
  });
};
main();
