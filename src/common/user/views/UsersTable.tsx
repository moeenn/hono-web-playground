import { titleCase } from "#src/lib/text.js"
import { Row, Table, TablePagination, type Column } from "#src/views/components/Table.js"
import type { UserEntity } from "../user_entity.js"

type Props = {
    users: UserEntity[]
}

const columns: Column[] = [
    { title: "Email", class: "min-w-62" },
    { title: "Role", class: "w-40 min-w-40" },
    { title: "Created At", class: "w-52 min-w-52" },
]

export function UsersTable(props: Props) {
    return (
        <div>
            <Table columns={columns}>
                {props.users.map((user) => (
                    <Row>
                        <td class="p-4">{user.email}</td>
                        <td class="p-4">{titleCase(user.role)}</td>
                        <td class="p-4">{user.createdAt.toLocaleString()}</td>
                    </Row>
                ))}
            </Table>

            <TablePagination total={20} limit={10} offset={0} pageUrl="/users" />
        </div>
    )
}
