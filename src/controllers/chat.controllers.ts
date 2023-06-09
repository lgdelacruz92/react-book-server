import { ChatChannel } from "@/models/chat/chat-channel";
import { ChatUser } from "@/models/chat/chat-user";
import { Request, Response } from "express";
import ChatInstance from "@/services/open-ai/chat/chat.service";
import ChatChannelsManager from "@/models/chat/chat-channels-manager";

export const putChatMember = async (req: Request, res: Response) => {
  const { channelId, userId } = req.params;

  try {
    // Connect user
    const chatUser = new ChatUser(userId);

    const userChannels = await chatUser.getChannels();
    const channelFilterMatchChannels = userChannels.filter(
      (userChannel) => userChannel.channelId === channelId
    );

    // this means that
    // channel is not created
    if (channelFilterMatchChannels.length === 0) {
      const chatChannelManager = new ChatChannelsManager();
      await chatChannelManager.createChannel("messaging", channelId, {
        name: "AI-Tutor",
        members: ["assistant", userId],
      });
      const channel = new ChatChannel(channelId);
      const members = await channel.getMembers();
      res.status(200).json(members);
    } else {
      throw Error(
        "This endpoint should not be called if user had already connected once."
      );
    }
  } catch (e) {
    console.log(`Error adding member\nReason: ${e}`);
    res.status(500).send(e);
  }
};

export const postChatToken = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const token = await ChatInstance.createToken(userId);
    res.status(200).json({ token });
  } catch (e) {
    console.log(`Error creating token\nReason: ${e}`);
    res.status(500).json(e);
  }
};

export const postCreateChat = async (req: Request, res: Response) => {
  const { channelId, userIds } = req.body;
  try {
    const channel = ChatInstance.channel("messaging", channelId, {
      members: [...userIds],
    });
    await channel.create();
    res.status(200);
  } catch (e) {
    console.log(`Error creating token\nReason: ${e}`);
    res.status(500).json(e);
  }
};
