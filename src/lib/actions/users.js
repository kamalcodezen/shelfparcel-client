"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

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