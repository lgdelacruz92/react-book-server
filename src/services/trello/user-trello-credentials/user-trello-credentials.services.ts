import UserTrelloCredential, {
  UserTrelloCredentialJSONType,
} from "@/models/trello/user-trello-credentials/user-trello-credential.models";
import { FirebaseError } from "@/services/firebase/errors.service";
import db from "@/services/firebase/db.service";

export const collectionName = "user-trello-credentials";

export const createUserTrelloCredentials = async (
  userTrelloCredential: UserTrelloCredential
): Promise<void> => {
  const docRef = db
    .collection(collectionName)
    .doc(userTrelloCredential.creds.authUserId);
  try {
    await docRef.set({ ...userTrelloCredential.toEncryptedJSON() });
  } catch (e) {
    console.error(
      `Error creating user-trello-credential ${userTrelloCredential.creds.authUserId}: ${e}`
    );
    throw e;
  }
};

export const getUserTrelloCredentials = async (
  authUserId: string
): Promise<UserTrelloCredentialJSONType> => {
  const docRef = db.collection(collectionName).doc(authUserId);
  try {
    const { exists, data } = await docRef.get();
    if (exists) {
      const userTrelloCreds = data();
      const userTrelloCredenTial = new UserTrelloCredential({
        authUserId: userTrelloCreds?.authUserId,
        key: userTrelloCreds?.key,
        token: userTrelloCreds?.token,
      });
      return userTrelloCredenTial.toDecryptedJSON();
    } else {
      throw new FirebaseError(404, "User trello credential not found");
    }
  } catch (e) {
    console.error(`Error getting user-trello-credential ${authUserId}: ${e}`);
    throw e;
  }
};
