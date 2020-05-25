import * as fs from 'fs'
const fsp = fs.promises

import g_functionCom, { EXT_NAMES } from '../templates/g-functionCom'
import { g_component_dir } from '../templates/g-folder-functionCom'

export default async function generateFile(arg: string, targetPath: string) {
    const args = arg.split(' ').filter(Boolean)

    const name = args[0]

    // 单文件
    if (name.includes('.')) {
        const dotInd = name.lastIndexOf('.')

        const fileName = name.substring(0, dotInd)
        const fileExt = name.substring(dotInd + 1).toLowerCase()

        if (EXT_NAMES.includes(fileExt)) {
            const filePath = `${targetPath}/${name}`
            let tpl = ''
            switch (fileExt) {
                case 'tsx':
                    tpl = g_functionCom(fileName, 'tsx')
                    break
                case 'jsx':
                    tpl = g_functionCom(fileName, 'jsx')
                    break

                default:
                    break
            }

            await fsp.writeFile(filePath, tpl)
        } else {
            throw 'only support tsx/jsx'
        }
    } else {
        await g_component_dir(args, targetPath)
    }
}
