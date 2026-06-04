import { type JSX } from "hono/jsx/jsx-runtime"
import { BaseLayout } from "./BaseLayout.js"
import { Flash } from "../components/Flash.js"
import type { FlashPayload } from "#src/lib/flash.js"
import type { option } from "#src/lib/monads.js"
import { Bars2Icon } from "../components/Icons.js"

type Props = {
    title: string
    children: JSX.Element | JSX.Element[]
    flash: option<FlashPayload>
}

export function AppLayout(props: Props) {
    return (
        <BaseLayout title={props.title}>
            <>
                {props.flash && (
                    <div class="mb-2">
                        <Flash payload={props.flash} />
                    </div>
                )}
            </>
            <div x-data="{ showSidebar: true }">
                <div class="flex gap-4">
                    <div class="w-72 p-4 pr-0" x-show="showSidebar">
                        <div class="h-12">
                            <h1 class="text-2xl">Logo</h1>
                        </div>

                        <div>
                            <a
                                href="/users"
                                class="block py-2 px-4 text-sm bg-zinc-200 rounded mb-2"
                            >
                                Users
                            </a>
                            <a
                                href="/projects"
                                class="block py-2 px-4 text-sm hover:bg-zinc-100 rounded mb-2"
                            >
                                Projects
                            </a>
                        </div>
                    </div>

                    <div class="flex-1">
                        <section class="container w-container mx-auto p-4">
                            <div class="flex justify-between pb-4">
                                <div class="flex space-x-4 ">
                                    <button
                                        x-on:click="showSidebar = !showSidebar"
                                        class="my-auto p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        <Bars2Icon className="size-5 " />
                                    </button>

                                    <h2 class="text-xl my-auto">{props.title}</h2>
                                </div>

                                <div class="my-auto">
                                    <a href="/logout" class="text-sm no-underline">
                                        Logout
                                    </a>
                                </div>
                            </div>
                            <div>{props.children}</div>
                        </section>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}
