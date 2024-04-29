export type User = {
    uid: string;
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    photoURL: string | null;
}