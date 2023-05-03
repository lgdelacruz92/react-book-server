import admin from "firebase-admin";

const localConfiguration = {
  credential: admin.credential.cert("./serviceAccountKey.json"),
};
const configuration =
  process.env.LOCAL_DEBUGGING === "true" ? localConfiguration : undefined;

admin.initializeApp(configuration);

const db = admin.firestore();

export default db;
