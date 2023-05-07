import { get } from "@/controllers/get";
import { appConfig } from "@/services/firebase/config";

export interface TrelloBoard {
  id: string;
  name: string;
  desc?: string;
  descData?: null;
  closed?: boolean;
  idOrganization?: string;
  idEnterprise?: null | string;
  pinned?: boolean;
  url?: string;
  shortUrl?: string;
  prefs?: {
    permissionLevel?: string;
    hideVotes?: boolean;
    voting?: string;
    comments?: string;
    invitations?: string;
    selfJoin?: boolean;
    cardCovers?: boolean;
    isTemplate?: boolean;
    cardAging?: string;
    calendarFeedEnabled?: boolean;
    hiddenPluginBoardButtons?: unknown[];
    switcherViews?: {
      _id: string;
      viewType: string;
      enabled: boolean;
    }[];
    background?: string;
    backgroundColor?: null;
    backgroundImage?: string;
    backgroundImageScaled?: {
      width: number;
      height: number;
      url: string;
    }[];
    backgroundTile?: boolean;
    backgroundBrightness?: string;
    backgroundBottomColor?: string;
    backgroundTopColor?: string;
    canBePublic?: boolean;
    canBeEnterprise?: boolean;
    canBeOrg?: boolean;
    canBePrivate?: boolean;
    canInvite?: boolean;
  };
  labelNames?: {
    green?: string;
    yellow?: string;
    orange?: string;
    red?: string;
    purple?: string;
    blue?: string;
    sky?: string;
    lime?: string;
    pink?: string;
    black?: string;
    green_dark?: string;
    yellow_dark?: string;
    orange_dark?: string;
    red_dark?: string;
    purple_dark?: string;
    blue_dark?: string;
    sky_dark?: string;
    lime_dark?: string;
    pink_dark?: string;
    black_dark?: string;
    green_light?: string;
    yellow_light?: string;
    orange_light?: string;
    red_light?: string;
    purple_light?: string;
    blue_light?: string;
    sky_light?: string;
    lime_light?: string;
    pink_light?: string;
    black_light?: string;
  };
}

export const trelloApi = "https://api.trello.com/1";
export const queryAuth = `key=${appConfig.app.trello_key}&token=${appConfig.app.trello_token}`;

export const getBoard = async (boardId: string): Promise<TrelloBoard> => {
  const response = await get<TrelloBoard>(
    `${trelloApi}/boards/${boardId}?${queryAuth}`
  );
  return response.data;
};

export const getBoards = async (): Promise<TrelloBoard[]> => {
  const response = await get<TrelloBoard[]>(`${trelloApi}/boards?${queryAuth}`);
  return response.data;
};
