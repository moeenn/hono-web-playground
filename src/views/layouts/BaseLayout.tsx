import { type JSX } from "hono/jsx/jsx-runtime"
import { content } from "#src/content.js"
import { getVersionedPath } from "#src/lib/cache.js"

type Props = {
	title: string
	meta?: JSX.Element
	children: JSX.Element
}

export function BaseLayout(props: Props) {
	return (
		<html lang="en" class="scroll-smooth">
			<head>
				<meta charset="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="/public/images/favicon.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{props.meta}
				<link rel="stylesheet" href={getVersionedPath("/public/css/styles.css")} />
				<title>
					{content.website.title} - {props.title}
				</title>
			</head>
			<body class="bg-zinc-50">
				<main>{props.children}</main>
			</body>
		</html>
	)
}
