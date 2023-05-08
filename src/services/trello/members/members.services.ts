import { get } from "@/controllers/get";
import { TrelloBoard } from "../boards/boards.services";
import { queryAuth, trelloApi } from "../constants";

export type MyBoards = Array<TrelloBoard>;

export const getMyBoards = async () => {
  const response = await get<MyBoards>(
    `${trelloApi}/members/me/boards?${queryAuth}`
  );
  return response.data;
};
