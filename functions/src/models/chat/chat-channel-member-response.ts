import { ChannelMemberResponse } from "stream-chat";
import { ChatMember } from "./chat-member";

export class ChatChannelMemberResponse {
  members: Array<ChatMember>;

  constructor(members: ChannelMemberResponse[]) {
    this.members = members.map<ChatMember>(
      (member) => new ChatMember(member.user_id)
    );
  }
}
