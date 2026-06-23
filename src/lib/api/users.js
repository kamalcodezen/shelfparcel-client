"use server"

import { serverFetch } from "../core/server"


export const getUserList = async () => {
  return await serverFetch("/api/users", {
    cache: "no-store",
    next: { revalidate: 0 }
  });
}