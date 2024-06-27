"use client"
import { getUser, isLoggedIn, logout } from "@/lib/pocketbase/client";
import { useRouter } from "next/navigation";


export default function Home() {
  const user = getUser();
  const isAuth = isLoggedIn();
  const router = useRouter();

  const onLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl font-bold">Welcome to Next PocketBase!</h1>
      <div className="flex flex-col items-center">
        <p className="text-xl mt-4">
          A simple, secure, and scalable backend for your web and mobile apps.
        </p>
        {isAuth ? (
          <div className="mt-4">
            <p className="text-xl">Welcome back, {user?.email}!</p>
            <button className="btn font-bold" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-xl">Please login to access the app.</p>
            <button className="btn font-bold" onClick={() => router.push("/login")}>Login</button>
          </div>
        )}
      </div>
    </main>
  );
}
