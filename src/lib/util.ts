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

export function format2underscore_naming_convention(name: string) {
  return name
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
}

export type OptionMap = {
  [props: string]: string
}
export type OptionSet = {
  [props: string]: boolean
}
export function getOptions(options: string, optionMap: OptionMap): OptionSet {
  if (!options || options.charAt(0) !== '-' || options.length < 2) {
    return {}
  }
  return options
    .slice(1)
    .split('')
    .reduce<OptionSet>((acc, item) => {
      if (optionMap[item]) {
        acc[optionMap[item]] = true
      }
      return acc
    }, {})
}
