// lib/cookie.js
import type { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';

const TOKEN_NAME = 'api_token';
const MAX_AGE = 60 * 60 * 8;

function createCookie(name: string, data: any, options = {}) {
    return serialize(name, data, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        ...options,
    });
}

function setTokenCookie(res: NextApiResponse, token: string) {
    res.setHeader('Set-Cookie', [
        createCookie(TOKEN_NAME, token),
        createCookie('authed', true, { httpOnly: false }),
    ]);
}

function getAuthToken(cookies: { [x: string]: any; }) {
    return cookies[TOKEN_NAME];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setTokenCookie, getAuthToken };
