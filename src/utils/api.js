import { getUserAuth } from "./storage"

export const makeRequest = async ({
    route,
    args,
    method,
}) => {
    const userAuth = await getUserAuth()

    return fetch(
        `https://one90-brasil-server.onrender.com${route}`,
        {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userAuth?.token}`,
            },
            ...(args && { body: JSON.stringify(args) })
        }
    )
}