import { DatabaseSync, type SQLOutputValue } from "node:sqlite"
import type { ZodError } from "zod"
import { logger } from "./logger.js"
import type { option } from "./monads.js"

export class DatabaseConfig {
    constructor(public readonly path: string = "site.db") {}
}

export class Database {
    #conn: DatabaseSync

    constructor(config: DatabaseConfig) {
        this.#conn = new DatabaseSync(config.path)
    }

    exec(query: string) {
        const statement = this.#conn.prepare(query)
        statement.run()
    }

    execNamed(query: string, args: NamedArgs) {
        const parsed = named(query, args)
        const statement = this.#conn.prepare(parsed.query)
        statement.run(...parsed.params)
    }

    query(query: string): QueryResult {
        const statement = this.#conn.prepare(query)
        return statement.all()
    }

    queryNamed(query: string, args: NamedArgs): QueryResult {
        const parsed = named(query, args)
        const statement = this.#conn.prepare(parsed.query)
        return statement.all(...parsed.params)
    }
}

export class EntityValidationError extends Error {
    public details: ZodError

    constructor(entityName: string, error: ZodError) {
        super(`unexpected data in database entity: '${entityName}'`)
        this.details = error
    }
}

type QueryResult = Record<string, SQLOutputValue>[]
type NamedArgs = Record<string, Stringable | Date | null>
type NamedResult = { query: string; params: ParamType[] }
type ParamType = option<string>

interface Stringable {
    toString(): string
}

// TODO: replace with the newer version.
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
}

export class MigrationManager {
    #db: Database
    #migrations: Migration[]

    constructor(db: Database, migrations: Migration[]) {
        this.#db = db
        this.#migrations = migrations
    }

    migrateUp() {
        for (const migration of this.#migrations) {
            logger.info({ name: migration.name }, "running migration")
            this.#db.exec(migration.up)
        }
    }
}
