import UserTrelloCredential from "@/models/trello/user-trello-credentials/user-trello-credential.models";
import db from "@/services/firebase/db.service";

export const collectionName = "user-trello-credentials";

export const createUserTrelloCredentials = async (
  userTrelloCredential: UserTrelloCredential
): Promise<void> => {
  const docRef = db
    .collection(collectionName)
    .doc(userTrelloCredential.creds.authUserId);
  try {
    await docRef.set({ ...userTrelloCredential.toJSON() });
  } catch (e) {
    console.error(
      `Error creating user-trello-credential ${userTrelloCredential.creds.authUserId}: ${e}`
    );
    throw e;
  }
};
