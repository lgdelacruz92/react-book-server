import { get } from "@/services/get";
import { queryAuth, trelloApi } from "../../constants";
import { TrelloCard } from "@/models/trello/boards/cards/trello-cards.models";

export const getCards = async (boardId: string): Promise<TrelloCard[]> => {
  const response = await get<TrelloCard[]>(
    `${trelloApi}/boards/${boardId}/cards?${queryAuth}`
  );
  return response.data;
};

export const getCard = async (
  boardId: string,
  cardId: string
): Promise<TrelloCard[]> => {
  const response = await get<TrelloCard[]>(
    `${trelloApi}/boards/${boardId}/cards/${cardId}?${queryAuth}`
  );
  return response.data;
};
