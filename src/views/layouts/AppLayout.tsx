import { type JSX } from "hono/jsx/jsx-runtime"
import { BaseLayout } from "./BaseLayout.js"
import { Flash } from "../components/Flash.js"
import type { FlashPayload } from "#src/src/lib/flash.js"
import type { option } from "#src/src/lib/monads.js"

type Props = {
    title: string
    children: JSX.Element | JSX.Element[]
    flash: option<FlashPayload>
}

export function AppLayout(props: Props) {
    return (
        <BaseLayout title={props.title}>
            <>
                {props.flash && (
                    <div class="mb-2">
                        <Flash payload={props.flash} />
                    </div>
                )}
            </>
            <div>{props.children}</div>
        </BaseLayout>
    )
}
