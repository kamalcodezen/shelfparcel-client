"use server"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";



export const serverFetch = async (path,) => {
    const res = await fetch(`${baseUrl}${path}`)
    // 401,403,404,500
    return res.json()
}



export const serverMutation = async (path, data, method = "POST") => {

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    // 401,403,404,500

    return res.json()
}
