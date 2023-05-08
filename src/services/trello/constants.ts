import { appConfig } from "@/services/firebase/config";

export const trelloApi = "https://api.trello.com/1";
export const queryAuth = `key=${appConfig.app.trello_key}&token=${appConfig.app.trello_token}`;
