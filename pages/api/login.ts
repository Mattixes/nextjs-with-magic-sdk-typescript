import type { NextApiRequest, NextApiResponse } from 'next';

import { Magic } from '@magic-sdk/admin';
import Iron from '@hapi/iron';
import CookieService from '../../lib/cookie';

if (!process.env.MAGIC_SECRET_KEY) {
    console.error("Error: Your MAGIC_SECRET_KEY enviroment variable does not found!");
}

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== 'POST') return res.status(405).end();

    // exchange the DID from Magic for some user data
    // TODO

    // exchange the DID from Magic for some user data
    const did = magic.utils.parseAuthorizationHeader(`${req.headers.authorization}`);
    const user = await magic.users.getMetadataByToken(did);

    // Author a couple of cookies to persist a users session
    // TODO

    // Author a couple of cookies to persist a user's session

    if (!process.env.ENCRYPTION_SECRET) {
        console.error("Error: Your ENCRYPTION_SECRET enviroment variable does not found!");
    }

    const token = await Iron.seal(
        user,
        `${process.env.ENCRYPTION_SECRET}`,
        Iron.defaults,
    );
    CookieService.setTokenCookie(res, token);

    res.end();
}
