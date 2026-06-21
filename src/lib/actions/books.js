"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

// librarian id diye status toggle update
export const toggleBooksStatusById = async ({ bookId, currentStatus }) => {
    try {
        const resData = await serverMutation(`/api/books/${bookId}`, { currentStatus }, "PATCH");

        revalidatePath("/dashboard/librarian/manageInventory");

        return resData;
    } catch (error) {
        console.error("Action Error:", error);
        return { success: false, message: "Server Action failed to execute." };
    }
};


// Book edit by id (update)
export const updateBookDetailsById = async (bookId, updateData) => {
    return await serverMutation(`/api/books/edit/${bookId}`, updateData, "PATCH")
}


// Book delete by id (delete)
export const deleteBooksById = async (bookId) => {
    return await serverMutation(`/api/books/delete/${bookId}`, {}, "DELETE")
}