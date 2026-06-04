import z from "zod"
import type { UserRole } from "./user_entity.js"

export class CreateUserRequest {
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
