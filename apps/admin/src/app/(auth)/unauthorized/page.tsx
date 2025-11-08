"use client";

import { useAuth } from "@clerk/nextjs";

const UnauthorizedPage = () => {
  const { signOut } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl text-gray-700 font-extralight">You do not have an access!</h1>
      <button className="bg-gray-900 text-white rounded px-4 py-2 hover:bg-gray-800 cursor-pointer" onClick={() => signOut()}>Sign out!</button>
    </div>
  );
};

export default UnauthorizedPage;
