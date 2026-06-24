"use server"

import { serverFetch } from "../core/server"

// user comment get … by id
export const getUserCommentById = async (userId) => {
  return await serverFetch(`/api/users/comments/${userId}`)
}

//  get users All comments by book Id
export const getUserAllComments = async (id) => {
  return await serverFetch(`/api/users/comments/${id}`)
}

// Get all users list
export const getUserList = async () => {
  return await serverFetch("/api/users", {
    cache: "no-store",
    next: { revalidate: 0 }
  });
}


