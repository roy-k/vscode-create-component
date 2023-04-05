import { format2CamelCase } from '../../../lib/util'
import { REACT_FILE_SUFFIX } from '../../../types'

export const EXT_NAMES = ['tsx', 'jsx']

function jsxTpl(name: string, deps?: string) {
  return `import React from 'react'

${deps || ''}

function ${name}(props) {
  return (
    <div>
      
    </div>
  )
}

export default ${name}
`
}

function tsxTpl(name: string, deps?: string) {
  return `import React from 'react'
    
${deps || ''}

export type ${name}Props {}
function ${name}(props: ${name}Props) {
  return (
    <div>
      
    </div>
  )
}

export default ${name}
`
}

export default function g_functionCom(
  name: string,
  type: REACT_FILE_SUFFIX,
  deps?: string
) {
  const formatName = format2CamelCase(name)
  return type === 'tsx' ? tsxTpl(formatName, deps) : jsxTpl(formatName, deps)
}
