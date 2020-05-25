import * as fs from 'fs'
const fsp = fs.promises

import { REACT_FILE_SUFFIX, STYLE_FILE_SUFFIX } from '../../types'
import g_functionCom from '../g-functionCom'

const styleSuffixes = ['less', 'sass', 'scss', 'styl']

export async function g_component_dir(args: string[], targetPath: string) {
    // 这样可以直接用name 做文件夹名, index加后缀 , 名称.less
    let suffix: REACT_FILE_SUFFIX = 'tsx'
    let [name, styleSuffix, md, ...rest] = args

    // tsx 可以省略,
    if (styleSuffix === 'jsx') {
        suffix = 'jsx'
        styleSuffix = styleSuffixes.includes(md) ? md : 'less'
        md = rest[0]
    } else {
        styleSuffix = styleSuffixes.includes(styleSuffix) ? styleSuffix : 'less'
    }

    const indexName = `index.${suffix}`
    const styleName = `${name}${md ? '.module' : ''}.${styleSuffix}`
    const styleImportStr = `import${md ? ' style from' : ''} './${styleName}'`

    const dirPath = `${targetPath}/${name}`
    const indexPath = `${dirPath}/${indexName}`
    const stylePath = `${dirPath}/${styleName}`

    const tpl = g_functionCom(name, suffix, styleImportStr)

    // Promise.all([ ])
    await fsp.mkdir(dirPath, { recursive: true })
    await fsp.writeFile(indexPath, tpl)
    await fsp.writeFile(stylePath, '')
}
