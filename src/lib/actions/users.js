"use server";

import { serverMutation } from "../core/server";

// admin nije role change korbe 
export const updateUserRole = async ({ userId, userRole }) => {
    return await serverMutation(`/api/users/updateRole/${userId}`, { userRole }, "PATCH"
    )
}