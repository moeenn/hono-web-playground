export function UserForm() {
	return (
		<form method="post" action="/users" class="flex flex-col space-y-4">
			<fieldset class="flex flex-col">
				<label class="text-xs mb-1">Email</label>
				<input for="email" type="email" name="email" class="bg-slate-100 border-b border-slate-400 px-3 py-2 rounded" />
			</fieldset>

			<fieldset class="flex flex-col">
				<label class="text-xs mb-1">Password</label>
				<input for="password" type="password" class="bg-slate-100 border-b border-slate-400 px-3 py-2 rounded" name="password" />
			</fieldset>

			<fieldset class="flex flex-col">
				<label class="text-xs mb-1">Role</label>
				<select class="bg-slate-100 border-b border-slate-400 px-3 py-2 rounded" name="role">
					<option value="CUSTOMER">Customer</option>
					<option value="ADMIN">Admin</option>
				</select>
			</fieldset>

			<hr class="my-6 border-b border-slate-100" />

			<fieldset>
				<button class="text-sm bg-slate-200 hover:bg-slate-300 rounded text-cyan-700 px-4 py-2">Submit</button>
			</fieldset>
		</form>
	)
}
