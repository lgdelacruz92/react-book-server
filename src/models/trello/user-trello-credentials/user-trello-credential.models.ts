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

  json(): UserTrelloCredentialType {
    return this.creds;
  }
}

export default UserTrelloCredential;
