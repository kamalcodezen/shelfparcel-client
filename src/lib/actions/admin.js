"use server";

import { serverMutation } from "../core/server";


// admin update approved status by id
export const adminUpdateApprovedStatusById = async ({ bookId, status }) => {
    return await serverMutation(`/api/books/approveStatus/${bookId}`, { status }, "PATCH")

}