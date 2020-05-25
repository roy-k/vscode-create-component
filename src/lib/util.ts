function uppercaseFirst(str: string) {
    return `${str.charAt(0).toUpperCase()}${str.toLowerCase().slice(1)}`
}

export function format2CamelCase(name: string) {
    if (name.includes('-')) {
        const names = name.split('-').filter(Boolean)

        return names.map(uppercaseFirst).join('')
    }
    if (name.includes('_')) {
        const names = name.split('_').filter(Boolean)

        return names.map(uppercaseFirst).join('')
    }
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
}