import type { User } from "../types/models"

type item = {
    user_id: number
}

export function isOwner(user: User | null, item: item): boolean {
    if (!user || !item) return false
    return user.id == item.user_id
}

export function canDelete(user: User | null, item: item): boolean {
    return isOwner(user, item)
}