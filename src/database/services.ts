import { Hasher } from "#src/lib/hash.js"
import type { Option } from "#src/lib/monads.js"
import type { UserEntity } from "./entities.js"
import type { UserRepo } from "./repos.js"

export class AuthService {
    constructor(private userRepo: UserRepo) { }

    async authenticate(email: string, password: string): Promise<Option<UserEntity>> {
        const user = this.userRepo.findByEmail(email)
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
