export interface Profile {
    id: string;
    name: string | null;
    avatar_url: string | null;
    role: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProfilePayload {
    name?: string | null;
    avatar_url?: string | null;
    role?: string | null;
}