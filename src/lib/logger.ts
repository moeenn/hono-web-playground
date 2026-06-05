import { pino } from "pino"
import { pinoLogger } from "hono-pino"

const options = {
    level: "info",
    redact: {
        paths: ["pid", "hostname", "req.headers", "res.headers"],
        remove: true,
    },
}

export const logger = pino(options)
export const serverlogger = pinoLogger({ pino: options })
