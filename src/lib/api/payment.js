"use server"

import { serverFetch } from "../core/server"

// user payments details get … by id
export const getUserPaymentDetailsById = async (email
) => {
    return await serverFetch(`/api/payments/${email
        }`)
} 