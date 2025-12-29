import { BASE_URL } from "./config";
import type { Topic } from "../types/models";

const ErrFetchTopic = "Error fetching topics"
const ErrCreateTopic = "Error creating topics"
const ErrDeleteTopic = "Error deleting topic"

export const getTopic = async (topic_id: string): Promise<Topic> => {
    const response = await fetch(`${BASE_URL}/topics/${topic_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    if (!response.ok) throw Error(ErrFetchTopic)

    const data = await response.json()
    return data.payload.data
}

export const getTopics = async (): Promise<Topic[]> => {
    const response = await fetch(`${BASE_URL}/topics`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    if (!response.ok) throw Error(ErrFetchTopic)

    const data = await response.json()
    return data.payload.data
}

export const createTopic = async (topic_Data: {title: string, description: string, user_id: number}) => {
    const response = await fetch(`${BASE_URL}/topics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topic_Data),
    })

    if (!response.ok) throw Error(ErrCreateTopic)

    return response.json()
}

export const deleteTopic = async (id: string) => {
    const response = await fetch(`${BASE_URL}/topics/${id}`, {
        method:"DELETE",
    })

    if (!response.ok) throw Error(ErrDeleteTopic)

    return response.json()
}