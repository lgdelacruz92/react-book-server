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
  getUser: async (userId: string) => {
    if (userId.length === 0) {
      throw new Error("Invalid channelId");
    }

    const usersDocRef = db.collection(collectionName).doc(userId);
    const doc = await usersDocRef.get();

    if (!doc.exists) {
      console.warn(`No user found`);
      throw Error(`No user found with id ${userId}`);
    }

    return doc.data();
  },
};

export default Users;
