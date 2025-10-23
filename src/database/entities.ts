import { z } from "zod"
import { Results, type Option } from "./monads.js"
import { EntityValidationError } from "./database.js"

type UserRole = "ADMIN" | "CUSTOMER"

export class UserEntity {
    static schema = z.object({
        id: z.uuid(),
        email: z.email(),
        password: z.string(),
        role: z.enum(["ADMIN", "CUSTOMER"]),
        createdAt: z.coerce.date(),
        deletedAt: z.coerce.date().nullable(),
    })

    constructor(
        public id: string,
        public email: string,
        public password: string,
        public role: UserRole,
        public createdAt: Date,
        public deletedAt: Option<Date>,
    ) {}

    static validated(raw: unknown): UserEntity {
        const v = Results.of(() => UserEntity.schema.parse(raw))
        if (v.isError) {
            console.log(v.error)
            throw new EntityValidationError("user")
        }

        return new UserEntity(
            v.value.id,
            v.value.email,
            v.value.password,
            v.value.role,
            v.value.createdAt,
            v.value.deletedAt,
        )
    }

    static make(email: string, password: string, role: UserRole): UserEntity {
        const id = crypto.randomUUID()
        const now = new Date()
        return new UserEntity(id, email, password, role, now, null)
    }
}
