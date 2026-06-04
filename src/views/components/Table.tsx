import type { JSX } from "hono/jsx/jsx-runtime"
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons.js"

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

type TablePaginationProps = {
    pageUrl: string
    total: number
    limit: number
    offset: number
}

export function TablePagination(props: TablePaginationProps) {
    const backDisabled = props.offset === 0
    const forwardDisabled = props.limit + props.offset >= props.total

    return (
        <div class="bg-gray-50 rounded-b text-gray-600 flex border border-t-0 border-gray-200">
            <div class="ml-auto inline-flex">
                <button
                    class="hover:enabled:bg-gray-200 text-xs p-2 text-gray-900 disabled:text-gray-400 cursor-pointer rounded-l"
                    disabled={backDisabled}
                    onclick={`window.location.href = '${props.pageUrl}?limit=${props.limit}&offset=${calculateOffset(
                        props.limit,
                        props.offset,
                        -1,
                    )}'`}
                >
                    <ChevronLeftIcon className="h-4" />
                </button>
                <span class="text-xs py-2 px-2 bg-gray-50">
                    Page {safePageNum(props.limit, props.offset)} /{" "}
                    {Math.ceil(props.total / props.limit)} ({props.total} Results)
                </span>
                <button
                    class="hover:enabled:bg-gray-200 rounded-br text-xs p-2 text-gray-900 disabled:text-gray-400 cursor-pointer rounded-r"
                    disabled={forwardDisabled}
                    onclick={`window.location.href = '${props.pageUrl}?limit=${props.limit}&offset=${calculateOffset(
                        props.limit,
                        props.offset,
                        1,
                    )}'`}
                >
                    <ChevronRightIcon className="h-4" />
                </button>
            </div>
        </div>
    )
}

function safePageNum(limit: number, offset: number): number {
    let result = offset / limit
    if (isNaN(result)) {
        result = 0
    }
    return Math.ceil(result) + 1
}

function calculateOffset(limit: number, offset: number, action: 1 | -1): number {
    switch (action) {
        case 1:
            return offset + limit

        case -1:
            const newOffset = offset - limit
            return newOffset >= 0 ? newOffset : 0
    }
}
