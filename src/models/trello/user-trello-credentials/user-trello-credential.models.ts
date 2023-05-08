interface UserTrelloCredentialType {
  authUserId: string;
  key: string;
  token: string;
}

class UserTrelloCredential {
  creds: UserTrelloCredentialType;

  constructor(credential: UserTrelloCredentialType) {
    this.creds = credential;
  }

  toJSON(): UserTrelloCredentialType {
    return {
      ...this.creds,
    };
  }
}

export default UserTrelloCredential;
