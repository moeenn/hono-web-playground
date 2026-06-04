import type { FlashPayload } from "#src/lib/flash.js"
import classNames from "classnames"

type Props = {
    payload: FlashPayload
}

export function Flash(props: Props) {
    return (
        <div
            class={classNames("p-4 border border-b", {
                "bg-green-200 text-green-800 border-green-300": props.payload.kind === "success",
                "bg-red-200 text-red-800 border-red-300": props.payload.kind === "error",
            })}
        >
            <div className="container px-4 mx-auto">
                <p class="text-sm">{props.payload.message}</p>
            </div>
        </div>
    )
}
