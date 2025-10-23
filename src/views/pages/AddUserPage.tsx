import type { Option } from "#src/lib/monads.js"
import type { FlashPayload } from "#src/lib/flash.js"
import { Flash } from "#src/views/components/Flash.js"
import { UserForm } from "#src/views/components/UserForm.js"
import { BaseLayout } from "#src/views/layouts/BaseLayout.js"

type Props = {
	flash: Option<FlashPayload>
}

export function AddUserPage(props: Props) {
	return (
		<BaseLayout title="Add user">
			<section class="container mx-auto p-4">
				<div class="bg-white p-4 rounded shadow mb-4">
					<a href="/users" class="text-xs bg-slate-100 hover:bg-slate-200 rounded px-3 py-2 cursor-pointer">Back</a>
				</div>

				{props.flash && (
					<div class="pb-4">
						<Flash payload={props.flash} />
					</div>
				)}

				<div class="bg-white p-4 rounded shadow">
					<UserForm />
				</div>
			</section>
		</BaseLayout>
	)
}
