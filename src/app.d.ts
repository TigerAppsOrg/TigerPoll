import type { Session } from "svelte-kit-cookie-session";

export type SessionData = {
    netid: string;
    email: string;
};

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            session: Session<SessionData>;
        }
        interface PageData {
            session: Session<SessionData>;
        }
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
