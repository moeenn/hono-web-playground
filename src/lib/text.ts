export function titleCase(text: string): string {
    return text.at(0)?.toUpperCase() + text.slice(1).toLowerCase()
}
