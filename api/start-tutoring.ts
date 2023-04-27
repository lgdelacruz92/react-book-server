import { upsertStreamChatUser } from "../services/upsert-stream-chat-user";
import { streamChatInstance } from "../services/stream-chat-instance";
import { createStreamChatToken } from "../services/create-stream-chat-token";

// Define the `/api/start-tutoring` endpoint
export const startTutoring = async (req, res) => {
  const { channel_id } = req.body;
  const assistant_id = "assistant";

  //   const connectedChannel = client.channel(
  //     "messaging",
  //     channel,
  //     channelOptions
  //   );
  //   await connectedChannel.watch();
  try {
    const { users } = await streamChatInstance.queryUsers({
      id: assistant_id,
    });

    if (users.length === 0) {
      await upsertStreamChatUser(assistant_id);
    }

    console.log("channel_id", channel_id);
    // Open the channel with the given `channel_id`
    const channel = streamChatInstance.channel("messaging", channel_id);

    // Watch the channel for new events
    await channel.watch();

    // Add the assistant as a user in the channel
    const members = Object.keys(channel.state.members);
    console.log("members", members);
    if (!members.includes(assistant_id)) {
      await channel.addMembers([assistant_id]);
    }

    // await streamChatInstance.connectUser(
    //   { id: assistant_id },
    //   createStreamChatToken(assistant_id)
    // );

    console.log("listening for messages...");

    // Listen for new messages in the channel
    channel.on("message.new", async (event) => {
      // Do something with the new message (e.g., respond in the channel)
      console.log(event.message.text);
      await channel.sendMessage({
        text: `Hello, you sent: "${event.message.text}"`,
        user_id: assistant_id,
      });
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
