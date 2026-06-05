import { v6 as uuidv6 } from "uuid"

const options = {
    clockseq: 0x1234,
    msecs: new Date("2024-01-01").getTime(),
    nsecs: 5678,
}

// uuidv6 is sortable, use this instead of crypto.randomUUID()
export const uuid = () => uuidv6(options)
