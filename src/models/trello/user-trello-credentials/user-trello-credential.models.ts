import { EncryptedString } from "@/utils/crypto.utils";

interface UserTrelloCredentialType {
  authUserId: string;
  key: EncryptedString;
  token: EncryptedString;
}

interface UserTrelloCredentialJSONType {
  authUserId: string;
  key: string;
  token: string;
}

class UserTrelloCredential {
  creds: UserTrelloCredentialType;

  constructor(credential: UserTrelloCredentialType) {
    this.creds = credential;
  }

  toEncryptedJSON(): UserTrelloCredentialJSONType {
    return {
      ...this.creds,
      key: this.creds.key.encryptedString,
      token: this.creds.token.encryptedString,
    };
  }

  toDecryptedJSON(): UserTrelloCredentialJSONType {
    return {
      ...this.creds,
      key: this.creds.key.decryptedString,
      token: this.creds.token.decryptedString,
    };
  }
}

export default UserTrelloCredential;
