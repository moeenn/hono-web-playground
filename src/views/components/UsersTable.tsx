import type { UserEntity } from "#src/database/entities.js"

type Props = {
	users: UserEntity[]
}

export function UsersTable(props: Props) {
	return (
		<div class="relative overflow-x-auto border border-gray-200 shadow rounded">
			<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-6 py-3">
							Id
						</th>
						<th scope="col" class="px-6 py-3">
							Email
						</th>
						<th scope="col" class="px-6 py-3">
							Role
						</th>
						<th scope="col" class="px-6 py-3">
							Created at
						</th>
					</tr>
				</thead>
				<tbody>
					{props.users.map(user => (
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
							<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{user.id}
							</th>
							<td class="px-6 py-4">
								{user.email}
							</td>
							<td class="px-6 py-4">
								{user.role}
							</td>
							<td class="px-6 py-4">
								{user.createdAt.toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>

	)
}
