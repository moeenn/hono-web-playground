import { DatabaseSync, type SQLOutputValue } from "node:sqlite"
import type { Option } from "./monads.js"
import type { ILogger } from "./logger.js"

export class DatabaseConfig {
    constructor(public readonly path: string = "site.db") {}
}

export class Database {
    #conn: DatabaseSync
    #logger: Option<ILogger> = null

    constructor(config: DatabaseConfig, logger?: ILogger) {
        this.#conn = new DatabaseSync(config.path)
        if (logger) {
            this.#logger = logger
        }
    }

    exec(query: string) {
        if (this.#logger) {
            this.#logger.info("executing query", { query })
        }

        const statement = this.#conn.prepare(query)
        statement.run()
    }

    execNamed(query: string, args: NamedArgs) {
        if (this.#logger) {
            this.#logger.info("executing named query", { query })
        }

        const parsed = named(query, args)
        const statement = this.#conn.prepare(parsed.query)
        statement.run(...parsed.params)
    }

    query(query: string): QueryResult {
        if (this.#logger) {
            this.#logger.info("running query", { query })
        }

        const statement = this.#conn.prepare(query)
        return statement.all()
    }

    queryNamed(query: string, args: NamedArgs): QueryResult {
        if (this.#logger) {
            this.#logger.info("running named query", { query })
        }

        const parsed = named(query, args)
        const statement = this.#conn.prepare(parsed.query)
        return statement.all(...parsed.params)
    }
}

export class EntityValidationError extends Error {
    constructor(entityName: string) {
        super(`unexpected data in database entity: '${entityName}'`)
    }
}

type QueryResult = Record<string, SQLOutputValue>[]
type NamedArgs = Record<string, Stringable | Date | null> | object
type NamedResult = { query: string; params: ParamType[] }
type ParamType = Option<string>

interface Stringable {
    toString(): string
}

function named(query: string, args: NamedArgs): NamedResult {
    const params = [...query.matchAll(/:([a-zA-Z_][a-zA-Z0-9_]*)/g)].map((match) =>
        match[0].slice(1),
    )

    const paramsSet = new Set(params)
    const paramArray: ParamType[] = []

    for (const param of paramsSet) {
        const paramValue = args[param]
        if (paramValue === undefined) {
            throw new MissingArgumentError(param)
        }

        query = query.replaceAll(`:${param}`, `?`)
        if (paramValue === null) {
            paramArray.push(null)
        }

        if (paramValue != null) {
            if (paramValue instanceof Date) {
                paramArray.push(paramValue.toISOString())
            } else {
                paramArray.push(paramValue.toString())
            }
        }
    }

    return {
        query: query.trim(),
        params: paramArray,
    }
}

export class MissingArgumentError extends Error {
    public readonly arg: string

    constructor(arg: string) {
        super("missing sql query argument: " + arg)
        this.arg = arg
    }
}

export type PaginatedListResult<T> = {
    data: T[]
    totalCount: number
}

export class LimitOffset {
    limit: number = 10
    offset: number = 0

    constructor(limit?: number, offset?: number) {
        if (limit) this.limit = limit
        if (offset) this.offset = offset
    }
}

export type Migration = {
    readonly name: string
    readonly up: string
    readonly down: string
}

export class MigrationManager {
    #db: Database
    #migrations: Migration[]
    #logger: Option<ILogger> = null

    constructor(db: Database, migrations: Migration[], logger?: ILogger) {
        this.#db = db
        this.#migrations = migrations
        if (logger) this.#logger = logger
    }

    migrateUp() {
        for (const migration of this.#migrations) {
            this.#logger?.info("running migration", { name: migration.name })
            this.#db.exec(migration.up)
        }
    }

    migrateDown() {
        const numMigrations = this.#migrations.length
        for (let i = numMigrations; i >= 0; i--) {
            const migration = this.#migrations[i]
            if (!migration) continue

            this.#logger?.info("rolling-back migration", { name: migration.name })
            this.#db.exec(migration.down)
        }
    }
}
