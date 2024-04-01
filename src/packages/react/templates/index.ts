import * as fs from 'fs'
const fsp = fs.promises

import { REACT_FILE_SUFFIX } from '../../../types'
import { format2CamelCase } from '../../../lib/util'
import { getComponentTpl, getIndexTpl, getScssTpl } from './g-functionCom'

export async function g_component_dir(args: string[], targetPath: string) {
  // 这样可以直接用name 做文件夹名, index加后缀 , 名称.less
  let suffix: REACT_FILE_SUFFIX = 'tsx'
  let [name] = args

  const formatName = format2CamelCase(name)

  const dirPath = `${targetPath}/${formatName}`

  const indexPath = `${dirPath}/index.ts`
  const componentPath = `${dirPath}/${formatName}.tsx`
  const stylePath = `${dirPath}/${formatName}.module.scss`

  await fsp.mkdir(dirPath, { recursive: true })
  await fsp.writeFile(indexPath, getIndexTpl(formatName))
  await fsp.writeFile(componentPath, getComponentTpl(formatName))
  await fsp.writeFile(stylePath, getScssTpl(formatName))
}
