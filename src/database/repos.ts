import { UserEntity } from "#src/database/entities.js"
import { type Database, LimitOffset } from "#src/lib/database.js"
import { type NilResult, type Option, Results } from "#src/lib/monads.js"

export class UserRepo {
    constructor(private db: Database) { }

    #listQuery = `
		select * from users
		where deletedAt is null
		order by createdAt desc
		limit :limit
		offset :offset
	`

    list(args?: LimitOffset): UserEntity[] {
        if (!args) args = new LimitOffset()
        const result = this.db.queryNamed(this.#listQuery, { ...args })
        return result.map((u) => UserEntity.validated(u))
    }

    #insertQuery = `
		insert into users (id, email, password, role, createdAt)
		values (:id, :email, :password, :role, :createdAt)
	`

    insert(user: UserEntity): NilResult {
        return Results.of(() => this.db.execNamed(this.#insertQuery, { ...user }))
    }

    #findByIdQuery = `
		select * from users
		where id = :id
		and deletedAt is null
		limit 1;
	`

    findById(id: string): Option<UserEntity> {
        const result = this.db.queryNamed(this.#findByIdQuery, { id })
        if (!result.length) {
            return null
        }

        return UserEntity.validated(result[0])
    }

    #findByEmailQuery = `
		select * from users
		where email = :email
		and deletedAt is null
		limit 1;
	`

    findByEmail(email: string): Option<UserEntity> {
        const result = this.db.queryNamed(this.#findByEmailQuery, { email })
        if (!result.length) {
            return null
        }

        return UserEntity.validated(result[0])
    }
}
