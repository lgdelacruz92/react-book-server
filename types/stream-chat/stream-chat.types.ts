import { Role, UserResponse } from "stream-chat";

export type User = {};

export type Member = {
  user_id?: string;
  user?: UserResponse;
  created_at?: string;
  updated_at?: string;
  banned?: boolean;
  shadow_banned?: boolean;
  role?: string;
  channel_role?: Role;
};

export type ChannelMembersResponse = {
  members: Member[];
  duration: string;
};
