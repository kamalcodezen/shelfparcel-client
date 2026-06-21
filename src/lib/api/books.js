"use server"

import { serverFetch } from "../core/server"

// librarian id diye books data get korchi
export const getBooksByLibrarianId = async (librarianId) => {
    return await serverFetch(`/api/books?librarianId=${librarianId}`)
}