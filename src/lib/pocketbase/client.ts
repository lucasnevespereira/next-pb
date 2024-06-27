import { pb } from "@/lib/pocketbase";

export const getBrowserClient = () => {
  if (typeof document !== "undefined") {
    pb.authStore.loadFromCookie(document.cookie);
    pb.authStore.onChange(() => {
      document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    });
  }
  return pb;
}

export const login = async (email: string, password: string) => {
  try {
    const res = await pb.collection('users').authWithPassword(email, password);
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    return res
  } catch (error) {
    console.error(error);
  }
}

export const logout = async () => {
  pb.authStore.clear();
}

export const isLoggedIn = () => {
  return pb.authStore.isValid;
}

export const getUser = () => {
  return pb.authStore.model;
}