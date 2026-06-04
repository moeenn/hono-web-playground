import type { Database } from "#src/lib/database.js"
import type { Hono } from "hono"
import { UsersController } from "./user_controller.js"
import { UserRepo } from "./user_repo.js"

export const UserModule = {
    init(db: Database, server: Hono) {
        const userRepo = new UserRepo(db)
        const userController = new UsersController(userRepo)
        server.route("/users", userController.routes())
    },
}
