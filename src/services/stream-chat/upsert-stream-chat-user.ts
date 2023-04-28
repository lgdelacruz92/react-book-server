import { streamChatInstance } from "./chat-instance";
// const chatClient = StreamChat.getInstance(apiKey, apiSecret);
// const assistantToken = chatClient.createToken(assistantId);

// await chatClient.connectUser(
//   { id: assistantId },
//   assistantToken
// );

// const assistantUser = await chatClient.queryUsers({ id: assistantId });

// if (!assistantUser.length) {
//   await chatClient.upsertUser({
//     id: assistantId,
//     name: 'Assistant',
//     image: 'https://www.example.com/assistant-image.jpg',
//   });
// }

export const upsertStreamChatUser = async (userId: string) => {
  await streamChatInstance.upsertUser({
    id: userId,
    name: "Assistant",
  });
};
