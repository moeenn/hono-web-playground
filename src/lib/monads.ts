export type option<T> = T | null
export type poption<T> = Promise<option<T>>
type okVariant<T> = { readonly isError: false; value: T }
type errVariant = { readonly isError: true; error: Error }
export type result<T> = okVariant<T> | errVariant
export type nilResult = result<null | undefined | void>
export type presult<T> = Promise<result<T>>

const ok = <T>(value: T): result<T> => ({
    isError: false,
    value: value,
})

const err = <T>(error: string | Error): result<T> => {
    if (error instanceof Error) {
        return {
            isError: true,
            error: error,
        }
    }

    return {
        isError: true,
        error: new Error(error),
    }
}

const nil = (): nilResult => ok(null)

function wrap(result: errVariant, prefix: string): errVariant {
    result.error = new Error(`${prefix}: ${result.error.message}`)
    return result
}

const toOption = <T>(result: result<T>): option<T> => (result.isError ? null : result.value)

function of<T>(fn: () => T): result<T> {
    try {
        const result = fn()
        if (typeof result === "number" && Number.isNaN(result)) {
            return err("invalid number")
        }
        return ok(result)
    } catch (ex) {
        if (ex instanceof Error) {
            return err(ex)
        }

        // eslint-disable-next-line no-console
        console.error(ex)
        return err("unknown error occurred")
    }
}

async function ofPromise<T>(promise: Promise<T>): presult<T> {
    try {
        const result = await promise
        if (typeof result === "number" && Number.isNaN(result)) {
            return err("invalid number")
        }
        return ok(result)
    } catch (ex) {
        if (ex instanceof Error) {
            return err(ex)
        }

        // eslint-disable-next-line no-console
        console.error(ex)
        return err("unknown error occurred")
    }
}

export const Results = {
    ok,
    err,
    wrap,
    nil,
    toOption,
    of,
    ofPromise,
}
