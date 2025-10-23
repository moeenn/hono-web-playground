import { pino, type Logger as PinoLogger } from "pino"

type LogDetails = Record<string, unknown>
export interface ILogger {
    info(message: string, details?: LogDetails): void
    warn(message: string, details?: LogDetails): void
    error(message: string, details?: LogDetails): void
}

export class Logger {
    #logger: PinoLogger

    constructor() {
        this.#logger = pino()
    }

    info(message: string, details?: LogDetails) {
        details ? this.#logger.info(details, message) : this.#logger.info(message)
    }

    warn(message: string, details?: LogDetails) {
        details ? this.#logger.warn(details, message) : this.#logger.warn(message)
    }

    error(message: string, details?: LogDetails) {
        details ? this.#logger.error(details, message) : this.#logger.error(message)
    }
}
