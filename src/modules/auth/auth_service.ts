import { Hasher } from "#src/lib/hash.js"
import type { poption } from "#src/lib/monads.js"
import type { UserEntity } from "#src/common/user/user_entity.js"
import type { UserRepo } from "../../common/user/user_repo.js"

export class AuthService {
    #userRepo: UserRepo

    constructor(userRepo: UserRepo) {
        this.#userRepo = userRepo
    }

    async authenticate(email: string, password: string): poption<UserEntity> {
        const user = this.#userRepo.findByEmail(email)
        if (!user) {
            return null
        }

        const isPasswordValid = await Hasher.verify({
            clearText: password,
            hash: user.password,
        })

        if (!isPasswordValid) {
            return null
        }

        return user
    }
}
