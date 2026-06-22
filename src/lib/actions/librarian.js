"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

// librarian books post korche
export const addBooksByLibrarian = async (bookData) => {
    return await serverMutation("/api/books", bookData, "POST")
}



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