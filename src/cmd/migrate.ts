import { Database, DatabaseConfig, type Migration, MigrationManager } from "#src/lib/database.js"
import { CreateUsersTableMigration } from "#src/database/migrations.js"
import { entrypoint } from "#src/lib/entrypoint.js"
import { logger } from "#src/lib/logger.js"

function main(): void {
    const migrations: Migration[] = [new CreateUsersTableMigration()]

    const config = new DatabaseConfig()
    const db = new Database(config)
    const mm = new MigrationManager(db, migrations)

    logger.info("running migrations")
    mm.migrateUp()
}

entrypoint(main)
