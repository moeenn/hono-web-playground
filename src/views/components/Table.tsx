import type { JSX } from "hono/jsx/jsx-runtime"

type Children = JSX.Element | JSX.Element[]

export type Column = {
    title: string
    class: string
}

type Props = {
    columns: Column[]
    children: Children
}

export function Table(props: Props) {
    return (
        <div class="relative overflow-x-auto border border-gray-200">
            <table class="w-full text-sm text-gray-900">
                <colgroup>
                    {props.columns.map((col) => (
                        <col class={col.class} />
                    ))}
                </colgroup>

                <thead class="text-xs text-gray-500 bg-gray-50">
                    <tr>
                        {props.columns.map((col) => (
                            <th scope="col" class="px-4 py-3 text-left">
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{props.children}</tbody>
            </table>
        </div>
    )
}

export function Row(props: { children: Children }) {
    return (
        <tr class="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
            {props.children}
        </tr>
    )
}
