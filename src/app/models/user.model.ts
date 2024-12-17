export type User = {
    created_at: string;
    email: string;
    id: string;
    name: string;
    role: Role
}

enum Role {
    ADMIN,
    MEMBER
}