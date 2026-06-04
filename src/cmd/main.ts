import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { Database } from "#src/lib/database.js"
import { entrypoint } from "#src/lib/entrypoint.js"
import { Config } from "#src/config.js"
import { registerMiddleware } from "#src/lib/middleware.js"
import { logger } from "../lib/logger.js"
import { UserModule } from "../common/user/user_module.js"

function main(): void {
    const config = new Config()
    const db = new Database(config.db)

    const server = new Hono()
    registerMiddleware(server)
    {
        UserModule.init(db, server)
    }
    // server.get("*", (ctx) => ctx.html(NotFoundPage()))

    serve({ fetch: server.fetch, port: config.server.port }, () => {
        logger.info({ address: config.server.getUrl() }, "starting server")
    })
}

entrypoint(main)
