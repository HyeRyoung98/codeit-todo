export interface Todo {
    id: number
    name: string
    isCompleted: boolean
}

export interface TodoDetail {
    id: number
    tenantId: string
    name: string
    memo: string | null
    imageUrl: string | null
    isCompleted: boolean
}

export interface CreateItem {
    name: string
}

export interface UpdateItem {
    name: string
    memo: string | null
    imageUrl: string | null
    isCompleted: boolean
}