import * as fs from 'fs'
const fsp = fs.promises

import { REACT_FILE_SUFFIX } from '../../../../types'
import g_functionCom from '../g-functionCom'

export async function g_component_dir(
  args: string[],
  targetPath: string,
  isPage = false
) {
  // 这样可以直接用name 做文件夹名, index加后缀 , 名称.less
  let suffix: REACT_FILE_SUFFIX = 'tsx'
  let [name] = args

  const indexName = `index${isPage ? '.page' : ''}.${suffix}`
  const styleName = `index.module.scss`
  const styleImportStr = `import styles from './index.module.scss'`

  const dirPath = `${targetPath}/${name}`
  const indexPath = `${dirPath}/${indexName}`
  const stylePath = `${dirPath}/${styleName}`

  const tpl = g_functionCom(name, suffix, styleImportStr)

  // Promise.all([ ])
  await fsp.mkdir(dirPath, { recursive: true })
  await fsp.writeFile(indexPath, tpl)
  await fsp.writeFile(stylePath, '')
}
