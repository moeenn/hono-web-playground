import type { UserEntity } from "#src/database/entities.js"
import type { Option } from "#src/lib/monads.js"
import type { FlashPayload } from "#src/lib/flash.js"
import { BaseLayout } from "#src/views/layouts/BaseLayout.js"
import { Flash } from "#src/views/components/Flash.js"
import { UsersTable } from "#src/views/components/UsersTable.js"

type Props = {
	users: UserEntity[]
	flash: Option<FlashPayload>
}

export function UsersPage(props: Props) {
	return (
		<BaseLayout title="Users">
			<section class="container mx-auto p-4">
				<div class="bg-white p-4 rounded shadow mb-4">
					<a href="/users/create" class="text-xs bg-slate-100 hover:bg-slate-200 rounded px-3 py-2 cursor-pointer">Add user</a>
				</div>

				{props.flash && (
					<div class="pb-4">
						<Flash payload={props.flash} />
					</div>
				)}

				<UsersTable users={props.users} />
			</section>
		</BaseLayout>
	)
}
