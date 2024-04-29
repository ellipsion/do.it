import { List } from "@/types/list"

export const findList = (listId: string, lists: List[]) => {
    return lists.find(list => list.id === listId)
}

export const findListBySlug = (slug: string | undefined, lists: List[]) => {
    return lists.find(list => list.slug === slug)
}