import { type Logger as PinoLogger, pino } from "pino"

type LogDetails = Record<string, unknown>
export interface ILogger {
    debug(message: string, details?: LogDetails): void
    info(message: string, details?: LogDetails): void
    warn(message: string, details?: LogDetails): void
    error(message: string, details?: LogDetails): void
}

export class Logger {
    #logger: PinoLogger

    constructor(logLevel = "info") {
        this.#logger = pino({
            level: logLevel,
        })
    }

    debug(message: string, details?: LogDetails): void {
        if (details) {
            this.#logger.debug(details, message)
            return
        }
        this.#logger.debug(message)
    }

    info(message: string, details?: LogDetails) {
        if (details) {
            this.#logger.info(details, message)
            return
        }
        this.#logger.info(message)
    }

    warn(message: string, details?: LogDetails) {
        if (details) {
            this.#logger.warn(details, message)
            return
        }
        this.#logger.warn(message)
    }

    error(message: string, details?: LogDetails) {
        if (details) {
            this.#logger.error(details, message)
            return
        }
        this.#logger.error(message)
    }
}
