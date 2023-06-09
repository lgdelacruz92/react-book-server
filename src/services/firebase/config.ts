import { config } from "firebase-functions";
import { config as dotEnvConfig } from "dotenv";

let appConfig: Record<string, Record<string, string>>;
if (process.env.LOCAL_DEBUGGING === "true") {
  dotEnvConfig();
  appConfig = {
    app: {
      stripe_secret_key: process.env.STRIPE_SECRET_KEY || "",
      chat_gpt_api_key: process.env.CHATGPT_API_KEY || "",
      stream_chat_secret: process.env.STREAMCHAT_SECRET || "",
      chat_gpt_api_url: process.env.CHATGPT_API_URL || "",
      stream_chat_key: process.env.STREAMCHAT_KEY || "",
      trello_key: process.env.TRELLO_KEY || "",
      trello_token: process.env.TRELLO_TOKEN || "",
      crypto_encryption_key: process.env.CRYPTO_ENCRYPTION_KEY || "",
      crypto_encryption_iv: process.env.CRYPTO_ENCRYPTION_IV || "",
    },
  };
} else {
  appConfig = config();
}

export { appConfig };
