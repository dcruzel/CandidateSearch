// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    username: string | null;
    image: string | null;
    bio: string | null;
    company: string | null;
    email: string |null;
    location: string | null;
}