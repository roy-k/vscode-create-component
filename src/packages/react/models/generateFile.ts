import * as fs from 'fs'
const fsp = fs.promises

import { g_component_dir } from '../templates/g-folder-functionCom'

export default async function generateFile(arg: string, targetPath: string) {
  const args = arg.split(' ').filter(Boolean)

  const name = args[0]

  // page
  if (name.includes('.page')) {
    const dotInd = name.lastIndexOf('.page')

    const fileName = name.substring(0, dotInd)
    await g_component_dir([fileName], targetPath, true)
  } else {
    await g_component_dir([name], targetPath)
  }
}
