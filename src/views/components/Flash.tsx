import type { FlashPayload } from "#src/lib/flash.js"
import classNames from "classnames"

type Props = {
	payload: FlashPayload
}

export function Flash(props: Props) {
	return (
		<div class={classNames("p-4 rounded", {
			"bg-green-100 text-green-800": props.payload.kind === "success",
			"bg-red-100 text-red-800": props.payload.kind === "error",
		})}>
			<p class="text-sm">{props.payload.message}</p>
		</div>
	)
}
