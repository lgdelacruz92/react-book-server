import admin from "./admin";

export const verifyUser = async (token: string): Promise<string> => {
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken.uid;
};
