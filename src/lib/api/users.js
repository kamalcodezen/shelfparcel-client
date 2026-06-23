"use server"

import { serverFetch } from "../core/server"


export const getUserList = async () => {
  return await serverFetch("/api/users")

}