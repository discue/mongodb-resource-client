export const toArrayAndClose = async function (cursor) {
    try {
        const array = await cursor.toArray()
        return array
    }
    finally {
        await cursor.close()
    }
}

export const getFirstAndClose = async function (cursor) {
    try {
        const first = await cursor.next()
        return first
    }
    finally {
        await cursor.close()
    }
}
