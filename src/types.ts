export interface UserType {
    _id: string,
    email: string,
    username?: string | null,
    profilePicture?: string | null,
    createdAt: NativeDate,
    updatedAt: NativeDate,
}