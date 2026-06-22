"use server"

import { serverFetch } from "../core/server"

// all books data get korchi jegulo status published ache
export const getAllPublishedBooks = async () => {
    return await serverFetch("/api/books/publishedBooks")
}

// book details by id
export const getBooksDetailsById = async (bookId) => {
    return await serverFetch(`/api/books/details/${bookId}`)
}


// librarian id diye books data get korchi
export const getBooksByLibrarianId = async (librarianId) => {
    return await serverFetch(`/api/books?librarianId=${librarianId}`)
}