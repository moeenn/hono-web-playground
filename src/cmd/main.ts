import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { Logger } from "#src/lib/logger.js"
import { Database } from "#src/lib/database.js"
import { UserRepo } from "#src/database/repos.js"
import { entrypoint } from "#src/lib/entrypoint.js"
import { Config } from "#src/config.js"
import { UsersController } from "#src/controllers.js"
import { registerMiddleware } from "#src/lib/middleware.js"

function main(): void {
    const logger = new Logger()
    const config = new Config()
    const db = new Database(config.db)

    const userRepo = new UserRepo(db)
    const userController = new UsersController(userRepo, logger)

    const server = new Hono()
    registerMiddleware(server)
    server.route("/users", userController.routes())
    // server.get("*", (ctx) => ctx.html(NotFoundPage()))

    serve({ fetch: server.fetch, port: config.server.port }, () => {
        logger.info("starting server", { address: config.server.getUrl() })
    })
}

entrypoint(main)
