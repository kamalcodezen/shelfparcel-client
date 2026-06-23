"use server"

import { serverFetch } from "../core/server"

// admin get all books
export const getAllBooks = async () => {
    return await serverFetch("/api/books/allBooks")
}


// admin get all pending books
export const getAllPendingBooks = async () => {
    return await serverFetch("/api/books/pendingBooks")
}