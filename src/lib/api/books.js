"use server"

import { protectedFetch, serverFetch } from "../core/server"




// all books data get korchi jegulo status published ache
export const getAllPublishedBooks = async (searchString) => {
    return await serverFetch(`/api/books/publishedBooks?${searchString}`)
}

// book details by id
export const getBooksDetailsById = async (bookId) => {
    return await serverFetch(`/api/books/details/${bookId}`)
}


// librarian id diye books data get korchi
export const getBooksByLibrarianId = async (librarianId) => {
    return await protectedFetch(`/api/books?librarianId=${librarianId}`)
}