import { Hono, type Context } from "hono"
import type { UserRepo } from "./database/repos.js"
import { UsersPage } from "./views/pages/UsersPage.js"
import { AddUserPage } from "./views/pages/AddUserPage.js"
import { UserEntity, type UserRole } from "./database/entities.js"
import z from "zod"
import type { ILogger } from "./lib/logger.js"
import { flash, getFlashed } from "./lib/flash.js"

class CreateUserRequest {
	email: string
	password: string
	role: UserRole

	#schema = z.object({
		email: z.email(),
		password: z.string(),
		role: z.enum(["ADMIN", "CUSTOMER"]),
	})

	constructor(args: unknown) {
		const v = this.#schema.parse(args)
		this.email = v.email
		this.password = v.password
		this.role = v.role
	}
}

export class UsersController {
	constructor(
		private userRepo: UserRepo,
		private logger: ILogger,
	) { }

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
		const users = this.userRepo.list()
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
		const result = this.userRepo.insert(newUser)
		if (result.isError) {
			this.logger.error("failed to create user", { error: result.error.message })
			flash(c, "error", "Failed to create user.")
			return c.redirect("/users/create")
		}

		flash(c, "success", "User created successfully.")
		return c.redirect("/users")
	}
}










