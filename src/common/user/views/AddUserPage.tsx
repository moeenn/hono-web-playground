import type { FlashPayload } from "#src/lib/flash.js"
import type { option } from "#src/lib/monads.js"
import { UserForm } from "./UserForm.js"
import { AppLayout } from "#src/views/layouts/AppLayout.js"

type Props = {
    flash: option<FlashPayload>
}

export function AddUserPage(props: Props) {
    return (
        <AppLayout title="Add user" flash={props.flash}>
            <div class="bg-white rounded shadow">
                <UserForm />
            </div>
        </AppLayout>
    )
}
