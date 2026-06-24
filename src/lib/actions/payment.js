"use server";

import { serverMutation } from "../core/server";


export const addPayment = async (paymentData) => {
    return await serverMutation("/api/payments", paymentData, "POST")
}