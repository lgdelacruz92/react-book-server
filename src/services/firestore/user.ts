import { UserInfoType } from "../../types/firestore/user-info.types";
import db from "./db";

const collectionName = "users";

const Users = {
  createUser: async (userId: string, userInfo: UserInfoType) => {
    if (userId.length === 0) {
      throw new Error("Invalid channelId or userId");
    }

    const usersDocRef = db.collection(collectionName).doc(userId);
    try {
      await usersDocRef.set({ ...userInfo });
      console.log(`User ${userId}`);
      return { ...userInfo };
    } catch (e) {
      console.error(`Error creating user ${userId}: ${e}`);
      throw e;
    }
  },
  getUser: async (authUserId: string) => {
    if (authUserId.length === 0) {
      throw new Error("Invalid channelId");
    }

    const usersDocRef = db
      .collection(collectionName)
      .where("authUserId", "=", authUserId);
    const queryResult = await usersDocRef.get();

    if (queryResult.size === 0) {
      console.warn(`No user found`);
      return null;
    }

    return queryResult.docs[0].data();
  },
};

export default Users;
