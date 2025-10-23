import argon2 from "argon2"

export const Hasher = {
    async hash(clearText: string): Promise<string> {
        return argon2.hash(clearText)
    },

    async verify(args: { clearText: string; hash: string }): Promise<boolean> {
        return argon2.verify(args.hash, args.clearText)
    },
}
