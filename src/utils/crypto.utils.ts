import { appConfig } from "@/services/firebase/config";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = appConfig.app.crypto_encryption_key;
const iv = appConfig.app.crypto_encryption_iv;

export const encryptString = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptString = (encrypted: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
