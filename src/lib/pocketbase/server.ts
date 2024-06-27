import { cookies } from "next/headers";
import { pb } from "@/lib/pocketbase";

export const getServerClient = () => {
  const cookie = cookies().get("pb_auth");
  const cookie_string = cookie?.name + "=" + cookie?.value;
  pb.authStore.loadFromCookie(cookie_string);
  return pb;
}