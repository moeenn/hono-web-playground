import type { FlashPayload } from "#src/lib/flash.js"
import type { option } from "#src/lib/monads.js"
import { AppLayout } from "#src/views/layouts/AppLayout.js"
import type { UserEntity } from "../user_entity.js"
import { UsersTable } from "./UsersTable.js"

type Props = {
    users: UserEntity[]
    flash: option<FlashPayload>
}

export function UsersPage(props: Props) {
    return (
        <AppLayout title="Users" flash={props.flash}>
            <section class="container mx-auto p-4">
                <div class="bg-white p-4 rounded shadow mb-4">
                    <a
                        href="/users/create"
                        class="text-xs bg-slate-200 hover:bg-slate-300 rounded px-3 py-2 cursor-pointer"
                    >
                        Add user
                    </a>
                </div>

                <UsersTable users={props.users} />
            </section>
        </AppLayout>
    )
}
