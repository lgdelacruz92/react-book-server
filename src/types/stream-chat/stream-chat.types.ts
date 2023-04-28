import { ChannelMemberResponse } from "stream-chat";

export type User = {};

export class AppStreamChatMember {
  user_id?: string;
  constructor(user_id?: string) {
    this.user_id = user_id;
  }
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
