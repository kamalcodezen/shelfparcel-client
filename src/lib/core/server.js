"use server"

import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";



// user token auth headers
export const authHeaders = async () => {
    const token = await getUserToken()
    const headers = token ? {
        authorization: `Bearer ${token}`,
    } : {}
    return headers;
}

// all server fetch
export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`)
    // 401,403,404,500
    return res.json()
}


// verify token  protected fetch 
export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            ... await authHeaders()
        }
    })
    // 401,403,404,500
    return res.json()
}



export const serverMutation = async (path, data, method = "POST") => {

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ... await authHeaders()
        },
        body: JSON.stringify(data),
    })

    // 401,403,404,500

    return res.json()
}
