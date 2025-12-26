import { BASE_URL } from "./config";

const ErrCreateUser = "Error creating user"

export const loginUser = async ( user_Data: {username: string}) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_Data),
    })

    if (!response.ok) throw Error(ErrCreateUser)

    return response.json()
}

export const createUser = async ( user_Data: {username: string}) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_Data),
    })

    if (!response.ok) throw Error(ErrCreateUser)

    return response.json()
}