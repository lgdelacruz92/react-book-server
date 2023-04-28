import axios from "axios";

export const sendStreamChatMessageResponse = async (
  channelId: string,
  message: string,
  userId: string,
  userToken: string
) => {
  try {
    const data = {
      message,
      user_id: userId,
    };

    const response = await axios.post(
      `https://chat.stream-io-api.com/channels/${channelId}/messages`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
      }
    );

    return response.data.message;
  } catch (error) {
    console.error(error);
    return null;
  }
};
