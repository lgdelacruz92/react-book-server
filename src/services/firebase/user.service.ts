import { UserInfoType } from "@/types/firestore/user-info.types";
import db from "./db.service";

const collectionName = "users";

export const createUser = async (userId: string, userInfo: UserInfoType) => {
  if (userId.length === 0) {
    throw new Error("Invalid channelId or userId");
  }

  const usersDocRef = db.collection(collectionName).doc(userId);
  try {
    await usersDocRef.set({ ...userInfo });
    return { ...userInfo };
  } catch (e) {
    console.error(`Error creating user ${userId}: ${e}`);
    throw e;
  }
};

export const getUser = async (authUserId: string) => {
  if (authUserId.length === 0) {
    throw new Error("Invalid authUserId");
  }

  const usersDocRef = db
    .collection(collectionName)
    .where("authUserId", "==", authUserId);
  const queryResult = await usersDocRef.get();

  if (queryResult.size === 0) {
    console.warn("No user found");
    return null;
  }

  return queryResult.docs[0].data();
};

export const putUser = async (
  authUserId: string,
  userProp: Partial<UserInfoType>
) => {
  if (authUserId.length === 0) {
    throw new Error("Invalid channelId");
  }

  const docRef = db.collection(collectionName).doc(authUserId);

  // Update a property in the document
  await docRef.update(userProp);
};
