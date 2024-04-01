import { format2underscore_naming_convention } from '../../../lib/util'

export const EXT_NAMES = ['tsx']

function tsxTpl(name: string, deps?: string) {
  return `import React from 'react' 
import styles from './index.module.scss'
    
${deps || ''}

export type ${name}Props = {}
export function ${name}(props: ${name}Props) {
  return (
    <div className={styles.${format2underscore_naming_convention(name)}}>
      
    </div>
  )
}
`
}

export function getComponentTpl(name: string) {
  return tsxTpl(name)
}

export function getIndexTpl(name: string) {
  return `export { ${name} } from './${name}'`
}

export function getScssTpl(name: string) {
  return `
.${format2underscore_naming_convention(name)} {
}
`
}
