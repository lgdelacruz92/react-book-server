import db from "./db";

const ChannelUserRepository = {
  createUserForChannel: async (channelId: string, userId: string) => {
    if (channelId.length === 0 || userId.length === 0) {
      throw new Error("Invalid channelId or userId");
    }

    const usersDocRef = db.collection("users").doc(channelId);

    try {
      await usersDocRef.set({ userId });
      console.log(`User ${userId} created for channel ${channelId}`);
      return;
    } catch (e) {
      console.error(
        `Error creating user ${userId} for channel ${channelId}: ${e}`
      );
      throw e;
    }
  },
  getUserForChannel: async (channelId: string) => {
    if (channelId.length === 0) {
      throw new Error("Invalid channelId");
    }

    const usersDocRef = db.collection("users").doc(channelId);
    const doc = await usersDocRef.get();

    if (!doc.exists) {
      console.warn(`No users found for channel ${channelId}`);
      return [];
    }

    return [doc.data().userId];
  },
};

export default ChannelUserRepository;
