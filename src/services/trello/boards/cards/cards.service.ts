import { get } from "@/services/get";
import { queryAuth, trelloApi } from "../../constants";
import { TrelloCard } from "@/models/trello/boards/cards/trello-cards.models";

export const getCards = async (boardId: string): Promise<TrelloCard[]> => {
  const response = await get<TrelloCard[]>(
    `${trelloApi}/boards/${boardId}?${queryAuth}`
  );
  return response.data;
};
