import type { Context } from "hono"
import type { Option } from "./monads.js"
import { getCookie, setCookie } from "hono/cookie"

const COOKIE_NAME = "session.flash"
const COOKIE_MAX_AGE = 60

export type FlashKind = "success" | "error"
export type FlashPayload = {
	kind: FlashKind
	message: string
}

export function flash(c: Context, kind: FlashKind, message: string) {
	const encoded = JSON.stringify({ kind, message })
	setCookie(c, COOKIE_NAME, encoded, {
		maxAge: COOKIE_MAX_AGE,
		httpOnly: true,
	})
}

export function getFlashed(c: Context): Option<FlashPayload> {
	const cookie = getCookie(c, COOKIE_NAME)
	if (!cookie) {
		return null
	}

	const parsed = JSON.parse(cookie) as FlashPayload
	setCookie(c, COOKIE_NAME, "{}", {
		maxAge: 0,
		httpOnly: true,
	})
	return parsed
}
