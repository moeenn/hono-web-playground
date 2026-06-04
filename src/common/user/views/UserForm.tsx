export function UserForm() {
    return (
        <form method="post" action="/users">
            <div class="flex flex-col space-y-8 px-4 py-8">
                <fieldset class="flex flex-col">
                    <label class="text-xs mb-1">Email</label>
                    <input
                        for="email"
                        type="email"
                        name="email"
                        class="bg-gray-100 border-b-2 border-gray-300 px-3 py-2 text-sm"
                    />
                </fieldset>

                <fieldset class="flex flex-col">
                    <label class="text-xs mb-1">Password</label>
                    <input
                        for="password"
                        type="password"
                        class="bg-gray-100 border-b-2 border-gray-300 px-3 py-2 text-sm"
                        name="password"
                    />
                </fieldset>

                <fieldset class="flex flex-col">
                    <label class="text-xs mb-1">Role</label>
                    <select
                        class="bg-gray-100 border-b-2 border-gray-300 px-3 py-2 text-sm"
                        name="role"
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </fieldset>
            </div>

            <fieldset class="bg-gray-50 p-4">
                <button class="text-sm bg-gray-200 hover:bg-gray-300 border border-gray-300 transition-colors rounded px-5 py-2">
                    Submit
                </button>
            </fieldset>
        </form>
    )
}
