import * as cookie from "cookie";
import jwt from "jsonwebtoken";
import prisma, { getLocalTimestampInSeconds } from "$lib";
import { PRIVATE_KEY } from '$env/static/private'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const myCookie = cookie.parse(event.request.headers.get("cookie") || "");
	const user = await decrypt(myCookie.user);
    const p = event.url.pathname;
    if (p == '/login') {
        if (user != null) {
            const buf = await prisma.member.findUnique({
                where: {
                    name: user.name
                },
            });
            if (buf != null && buf.password == user.password) return new Response('Redirect', {status: 303, headers: { Location: '/' }});
        }
    } else {
        if (user == null) return new Response('Redirect', {status: 303, headers: { Location: '/login' }});
        else {
            const buf = await prisma.member.findUnique({
                where: {
                    name: user.name
                },
            });
            if (buf != null && buf.password == user.password) {
                await prisma.member.update({
                    data: {
                        lastOnline: getLocalTimestampInSeconds()
                    },
                    where: {
                        id: buf.id
                    }
                })
                event.locals.user = buf
            }
            else return new Response('Redirect', {status: 303, headers: { Location: '/login' }});
        }
    }   
	const response = await resolve(event);
	return response;
}
const decrypt = (token: any, drop = false) => {
	return new Promise<{
        name: string;
        password: string;
    } | null>(async (resolve, reject) => {
		if (token == undefined) {
			if (drop) reject(401);
			else resolve(null);
		} else {
			jwt.verify(token, PRIVATE_KEY, (err: any, v: any) => {
				if (err) {
					if (drop) reject(401);
					else resolve(null);
				} else resolve(v);
			});
		}
	});
};