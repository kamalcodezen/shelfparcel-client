"use server"

import { serverFetch } from "../core/server"



// user payments details get … by email total list get by id
export const getPaymentDetailsByLibrarianEmail = async (email) => {
    return await serverFetch(`/api/payments/librarian/${email}`)

}