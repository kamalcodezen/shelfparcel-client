"use server"

import { serverMutation } from "../core/server"

// librarian books post korche
export const addBooksByLibrarian = async (bookData) => {
    return await serverMutation("/api/books", bookData, "POST")
}