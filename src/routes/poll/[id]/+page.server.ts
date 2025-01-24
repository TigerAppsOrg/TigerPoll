import { redirectIfNoAuth } from "$lib/server/guards";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (req) => {
    redirectIfNoAuth(req);
};
