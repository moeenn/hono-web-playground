import { type Database, LimitOffset } from "#src/lib/database.js"
import { UserEntity } from "#src/database/entities.js"
import type { Option } from "#src/lib/monads.js"

export class UserRepo {
    db: Database

    constructor(db: Database) {
        this.db = db
    }

    #listQuery = `
		select * from users
		where deletedAt is null
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

    insert(user: UserEntity) {
        this.db.execNamed(this.#insertQuery, { ...user })
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
}
