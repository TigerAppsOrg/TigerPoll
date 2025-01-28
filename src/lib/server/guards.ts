import { type ServerLoadEvent } from "@sveltejs/kit";
import type { SessionData } from "../../app";
import { CASClient } from "./cas";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
/**
 * Check if the user is an admin.
 * @param req Request object (use directly from the server load event)
 * @returns True if the user is an admin, false otherwise
 */
export const isAdmin = async (req: ServerLoadEvent): Promise<boolean> => {
    const sessionData: SessionData = req.locals.session.data;
    const netid = sessionData.netid;

    // Check in the database if the user is an admin
    const adminResult = await db
        .select({ isAdmin: users.isAdmin })
        .from(users)
        .where(eq(users.netid, netid));
    if (adminResult.length == 0) {
        throw new Error("User is not in the db");
    }
    // Return true if the user is an admin
    return adminResult[0].isAdmin;
};

/**
 * Redirect the user to the CAS login page if they are not authenticated.
 * @param req Request object (use directly from the server load event)
 */
export const redirectIfNoAuth = async (req: ServerLoadEvent) => {
    const sessionData = req.locals.session.data;
    CASClient.check(sessionData);
};
