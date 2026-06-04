import type { FlashPayload } from "#src/lib/flash.js"
import type { option } from "#src/lib/monads.js"
import { PlusIcon } from "#src/views/components/Icons.js"
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
                <div class="shadow">
                    <div class="bg-white border border-gray-200 px-4 py-2 rounded-t">
                        <a
                            title="Add User"
                            href="/users/create"
                            class="inline-flex p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors"
                        >
                            <PlusIcon className="size-4" />
                        </a>
                    </div>

                    <UsersTable users={props.users} />
                </div>
            </section>
        </AppLayout>
    )
}
