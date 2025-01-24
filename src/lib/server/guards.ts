import type { ServerLoadEvent } from "@sveltejs/kit";
import type { SessionData } from "../../app";
import { CASClient } from "./cas";

/**
 * Check if the user is an admin.
 * @param req Request object (use directly from the server load event)
 * @returns True if the user is an admin, false otherwise
 */
// TODO: Implement this function
export const isAdmin = async (req: ServerLoadEvent): Promise<boolean> => {
    const sessionData: SessionData = req.locals.session.data;
    const netid = sessionData.netid;

    // Check in the database if the user is an admin

    // Return true if the user is an admin
};

/**
 * Redirect the user to the CAS login page if they are not authenticated.
 * @param req Request object (use directly from the server load event)
 */
export const redirectIfNoAuth = async (req: ServerLoadEvent) => {
    const sessionData = req.locals.session.data;
    CASClient.check(sessionData);
};
