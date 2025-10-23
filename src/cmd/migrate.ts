import process from "node:process"
import { Database, DatabaseConfig, MigrationManager, type Migration } from "src/lib/database.js"
import { Logger } from "#src/lib/logger.js"
import { CreateUsersTableMigration } from "#src/database/migrations.js"
import { entrypoint } from "#src/lib/entrypoint.js"
import { Argparse } from "#src/lib/argparse.js"

type CommandLineArgs = {
    cmd: string
}

function main(args: string[]): void {
    const parser = new Argparse(args, [
        {
            name: "cmd",
            kind: "string",
            description: "Migration command",
            usage: "-cmd=[up,down]",
        },
    ])

    const parsedArgs = parser.parse<CommandLineArgs>()
    if (parsedArgs.isError) {
        throw parsedArgs.error
    }

    const logger = new Logger()
    const config = new DatabaseConfig()
    const db = new Database(config)
    const migrations: Migration[] = [new CreateUsersTableMigration()]

    const mm = new MigrationManager(db, migrations, logger)
    switch (parsedArgs.value.cmd) {
        case "up":
            logger.info("running migrations")
            mm.migrateUp()
            break

        case "down":
            logger.info("rolling-back database")
            mm.migrateDown()
            break

        default:
            throw new Error("invalid command: " + parsedArgs.value.cmd)
    }
}

entrypoint(() => main(process.argv))
