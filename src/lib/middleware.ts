import type { Context, Hono, Next } from "hono"
import { trimTrailingSlash } from "hono/trailing-slash"
import { secureHeaders } from "hono/secure-headers"
import { serveStatic } from "@hono/node-server/serve-static"
import { serverlogger } from "./logger.js"

const CACHE_MAX_AGE = 60 * 60 * 24 * 7
const CACHE_HEADER_VALUE = `public, max-age=${CACHE_MAX_AGE}`

async function cacheMiddleware(c: Context, next: Next) {
    c.header("Cache-Control", CACHE_HEADER_VALUE)
    await next()
}

export function registerMiddleware(app: Hono) {
    app.use("/public", cacheMiddleware)
    app.use(serverlogger)
    app.use(secureHeaders())
    app.use(trimTrailingSlash())
    app.use("/public/*", serveStatic({ root: "./" }))
}
