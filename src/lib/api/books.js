"use server"

import { serverFetch } from "../core/server"

// all books data get korchi jegulo status published ache
export const getAllPublishedBooks = async () => {
    return await serverFetch("/api/books/publishedBooks")
}


// librarian id diye books data get korchi
export const getBooksByLibrarianId = async (librarianId) => {
    return await serverFetch(`/api/books?librarianId=${librarianId}`)
}