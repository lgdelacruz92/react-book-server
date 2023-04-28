import { Role, UserResponse, ChannelMemberResponse } from "stream-chat";

export type User = {};

export class AppStreamChatMember {
  user_id?: string;
  constructor(user_id?: string) {}
  queryMessages() {}
}

export class AppStreamChatChannelMemberResponse {
  members: AppStreamChatMember[];

  constructor(members: ChannelMemberResponse[]) {
    this.members = members.map(
      (member) => new AppStreamChatMember(member.user_id)
    );
  }
}
