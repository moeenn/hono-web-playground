import crypto from "node:crypto"

const cacheVersion = crypto.randomBytes(5).toString("hex")

export function getVersionedPath(path: string): string {
    return path + "?v=" + cacheVersion
}
