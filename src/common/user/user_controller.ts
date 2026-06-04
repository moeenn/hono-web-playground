import { Hono, type Context } from "hono"
import type { UserRepo } from "./user_repo.js"
import { UsersPage } from "./views/UsersPage.js"
import { AddUserPage } from "./views/AddUserPage.js"
import { UserEntity } from "#src/common/user/user_entity.js"
import { flash, getFlashed } from "#src/lib/flash.js"
import { CreateUserRequest } from "./user_dto.js"
import { logger } from "#src/lib/logger.js"

export class UsersController {
    #userRepo: UserRepo

    constructor(userRepo: UserRepo) {
        this.#userRepo = userRepo
    }

    routes(): Hono {
        const router = new Hono()
        {
            router.get("/", this.getUsersPage.bind(this))
            router.get("/create", this.createUserPage.bind(this))
            router.post("/", this.processUserCreate.bind(this))
        }
        return router
    }

    async getUsersPage(c: Context) {
        const users = this.#userRepo.list()
        const flash = getFlashed(c)
        const html = UsersPage({ users, flash })
        return c.html(html)
    }

    async createUserPage(c: Context) {
        const flash = getFlashed(c)
        const html = AddUserPage({ flash })
        return c.html(html)
    }

    async processUserCreate(c: Context) {
        const body = await c.req.parseBody()
        const validatedBody = new CreateUserRequest(body)
        const newUser = await UserEntity.make(validatedBody)
        const result = this.#userRepo.insert(newUser)
        if (result.isError) {
            logger.error({ error: result.error.message }, "failed to create user")
            flash(c, "error", "Failed to create user.")
            return c.redirect("/users/create")
        }

        flash(c, "success", "User created successfully.")
        return c.redirect("/users")
    }
}
