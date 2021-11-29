import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:awsBVldK3OugrryS@cluster0.l7t9t.mongodb.net/Next?retryWrites=true&w=majority"
  );
  return client;
}
