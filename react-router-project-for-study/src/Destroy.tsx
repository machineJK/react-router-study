import { redirect } from "react-router-dom";
import { deleteContact } from "./contact";
import { RequestType } from "./allType";

export async function action(parameters: RequestType) {
  //   throw new Error("oh dang!");
  await deleteContact(parameters.params.contactId);
  return redirect("/");
}
