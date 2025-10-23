import { z } from "zod"
import { EntityValidationError } from "#src/lib/database.js"
import { Hasher } from "#src/lib/hash.js"
import type { Option } from "#src/lib/monads.js"

type UserRole = "ADMIN" | "CUSTOMER"

export class UserEntity {
    public id: string
    public email: string
    public password: string
    public role: UserRole
    public createdAt: Date
    public deletedAt: Option<Date>

    static schema = z.object({
        id: z.uuid(),
        email: z.email(),
        password: z.string(),
        role: z.enum(["ADMIN", "CUSTOMER"]),
        createdAt: z.coerce.date(),
        deletedAt: z.coerce.date().nullable(),
    })

    constructor(args: UserEntity) {
        this.id = args.id
        this.email = args.email
        this.password = args.password
        this.role = args.role
        this.createdAt = args.createdAt
        this.deletedAt = args.deletedAt
    }

    static validated(raw: unknown): UserEntity {
        const v = UserEntity.schema.safeParse(raw)
        if (!v.success) {
            throw new EntityValidationError("user", v.error)
        }

        return new UserEntity(v.data)
    }

    static async make(args: {
        email: string
        password: string
        role: UserRole
    }): Promise<UserEntity> {
        const id = crypto.randomUUID()
        const now = new Date()
        const passwordHash = await Hasher.hash(args.password)

        return new UserEntity({
            ...args,
            id,
            password: passwordHash,
            createdAt: now,
            deletedAt: null,
        })
    }
}
