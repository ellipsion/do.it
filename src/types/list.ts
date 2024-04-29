import { Emoji } from "./emoji"

export type List = {
    id: string,
    name: string,
    slug: string,
    emoji: Emoji
    taskCount?: number
}