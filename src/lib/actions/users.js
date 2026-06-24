"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


// users comment post korche 
export const addUserComment = async (reviewPayload) => {
    return await serverMutation("/api/users/comments", reviewPayload, "POST")
}

// user comments edit by
export const updateUserCommentById = async (id, comment) => {
    const res = await serverMutation(`/api/users/comments/edit/${id}`,  comment , "PATCH");
    revalidatePath("/dashboard/user/myReviews")
    return res;
}




// admin nije role change korbe 
export const updateUserRole = async ({ userId, userRole }) => {
    const res = await serverMutation(`/api/users/updateRole/${userId}`, { userRole }, "PATCH"
    )
    revalidatePath("/dashboard/admin/users")
    return res;
}


// admin user deleteUserById
export const deleteUserById = async (userId) => {
    const res = await serverMutation(`/api/users/delete/${userId}`, {}, "DELETE")
    revalidatePath("/dashboard/admin/users")
    return res;
}