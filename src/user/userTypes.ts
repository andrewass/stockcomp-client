export type UserDetails = {
    username: string
    fullName: string
    country: string
}

export type User = {
    username: string
    email: string
    userType: string
    userStatus: string
}

export type UserPage = {
    users: User[]
    totalEntriesCount: number
}