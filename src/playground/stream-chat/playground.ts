import AppStreamChat from "@/services/stream-chat/stream-chat";

const main = async () => {
  console.log(
    await AppStreamChat.getChannelMembers(
      "028aa002-6f75-4f19-8cf1-22b245039301"
    )
  );
};
main();
