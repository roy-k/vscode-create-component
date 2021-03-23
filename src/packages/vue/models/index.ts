import * as path from 'path'
import * as fs from 'fs'
const fsp = fs.promises

import * as vscode from 'vscode'
import * as Case from 'case'

import { getOptions, OptionMap } from '../../../lib/util'

import { genListTpl } from './listView'
import { genFormTpl } from './formView'
import { genDefaultTpl } from './defaultView'

const optionMap: OptionMap = {
    /** list模式 */
    l: 'listView',
    /** drawer */
    f: 'formView',
    /** 单文件 */
    s: 'single',
    /** 其他 */
    d: 'default',
}
export default async function generateFile(arg: string, targetPath: string) {
    const args = arg.split(' ').filter(Boolean)

    const name = args[0]
    const options = args[1]
    const extraStr = args[2]

    const formatName = Case.pascal(name)

    const optionsSet = getOptions(options, optionMap)

    // # 检测冲突
    const dirFiles = await fsp.readdir(targetPath)
    if (dirFiles.includes(formatName)) {
        vscode.window.showErrorMessage('命名冲突')
        return
    }

    // # 创建文件
    if (optionsSet.single) {
        let tpl = ''
        if (optionsSet.listView) {
            // 处理 extraStr
            tpl = genListTpl({
                name: formatName,
                extraStr,
            })
        }

        if (optionsSet.formView) {
            // extra  img / 类似
            tpl = genFormTpl({
                name: formatName,
                extraStr,
            })
        } else {
            // 普通 vue 文件
            tpl = genDefaultTpl({
                name: formatName,
            })
        }

        const filePath = path.join(targetPath, `${formatName}.vue`)
        fsp.writeFile(filePath, tpl)
    } else {
        // 创建文件夹
        try {
            const dirPath = path.join(targetPath, formatName)

            await fsp.mkdir(dirPath)
            /**
             * 1. listView
             * 2. formView
             * 3. default  无参数
             * 4. 多文件
             * extra 需要处理下
             */
            // 根据类型创建文件
            const noArgs = !optionsSet.default && !optionsSet.listView && !optionsSet.formView
            if (optionsSet.default || noArgs) {
                const filePath = path.join(dirPath, 'index.vue')
                const tpl = genDefaultTpl({
                    name: formatName,
                    extraStr,
                })
                fsp.writeFile(filePath, tpl)
            }

            // # list (无default 则为 index)
            if (optionsSet.listView) {
                const filePath = path.join(dirPath, optionsSet.default ? 'List.vue' : 'index.vue')
                const tpl = genListTpl({
                    name: optionsSet.default ? `${formatName}List` : formatName,
                    extraStr,
                })
                fsp.writeFile(filePath, tpl)
            }

            // # form (无default 则为index)
            if (optionsSet.formView) {
                const filePath = path.join(
                    dirPath,
                    optionsSet.default || optionsSet.listView ? 'form.vue' : 'index.vue'
                )
                const tpl = genFormTpl({
                    name: optionsSet.default ? `${formatName}Form` : formatName,
                    extraStr,
                })
                fsp.writeFile(filePath, tpl)
            }
        } catch (error) {
            vscode.window.showErrorMessage(JSON.stringify(error))
        }
    }

    // # 写入模板
}
