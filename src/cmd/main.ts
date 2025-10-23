import { Database, DatabaseConfig } from "src/lib/database.js"
import { UserRepo } from "#src/database/repos.js"
import { AuthService } from "#src/database/services.js"
import { entrypoint } from "#src/lib/entrypoint.js"

async function main(): Promise<void> {
    const config = new DatabaseConfig()
    const db = new Database(config)

    const userRepo = new UserRepo(db)
    const authService = new AuthService(userRepo)
    // const users = [
    // 	await UserEntity.make({ email: "admin@site.com", password: "123123123", role: "ADMIN" }),
    // 	await UserEntity.make({ email: "one@site.com", password: "cansclkascn", role: "CUSTOMER" }),
    // 	await UserEntity.make({ email: "two@site.com", password: "sackwdlkja", role: "CUSTOMER" }),
    // ]

    const user = await authService.authenticate("admin@site.com", "1231231234")
    console.log(user)
}

entrypoint(main)
