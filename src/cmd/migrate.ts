import { Database, DatabaseConfig, type Migration, MigrationManager } from "#src/lib/database.js"
import { entrypoint } from "#src/lib/entrypoint.js"
import { logger } from "#src/lib/logger.js"

const CreateUsersTableMigration = {
    name: "create-users-table",
    up: `create table if not exists users (
			id varchar(40)
			, email varchar(100) not null
			, password varchar(255) not null
			, role varchar(20) not null
			, createdAt timestamp not null default current_timestamp
			, deletedAt timestamp
			, primary key (id)
			, constraint userEmailUnique unique (email)
		);
	`,
}

function main(): void {
    const migrations: Migration[] = [CreateUsersTableMigration]
    const config = new DatabaseConfig()
    const db = new Database(config)
    const mm = new MigrationManager(db, migrations)

    logger.info("running migrations")
    mm.migrateUp()
}

entrypoint(main)
