import { connectToDb } from "@/lib/mongoConnection";

export async function orderCheckout(formdata) {
  try {
    console.log("Connecting to database...");
    await connectToDb();

    return { success: true };
  } catch (error) {
    console.log("Error from order checkout server action: ", error);
  }
}
