"use server";

import { serverMutation } from "../core/server";




// Book edit by id (update)
export const updateBookDetailsById = async (bookId, updateData) => {
    return await serverMutation(`/api/books/edit/${bookId}`, updateData, "PATCH")
}


// Book delete by id (delete)
export const deleteBooksById = async (bookId) => {
    return await serverMutation(`/api/books/delete/${bookId}`, {}, "DELETE")
}