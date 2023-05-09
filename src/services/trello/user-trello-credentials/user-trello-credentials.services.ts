import UserTrelloCredential from "@/models/trello/user-trello-credentials/user-trello-credential.models";
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
    await docRef.set({ ...userTrelloCredential.json() });
  } catch (e) {
    console.error(
      `Error creating user-trello-credential ${userTrelloCredential.creds.authUserId}: ${e}`
    );
    throw e;
  }
};

export const getUserTrelloCredentials = async (
  authUserId: string
): Promise<UserTrelloCredential> => {
  const docRef = db.collection(collectionName).doc(authUserId);
  try {
    const doc = await docRef.get();
    const data = doc.data();
    if (doc.exists && data) {
      return new UserTrelloCredential({
        authUserId: data.authUserId,
        key: data.key,
        token: data.token,
      });
    } else {
      throw new FirebaseError(404, "User trello credential not found");
    }
  } catch (e) {
    console.error(`Error getting user-trello-credential ${authUserId}: ${e}`);
    throw e;
  }
};
