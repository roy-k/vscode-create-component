import * as fs from 'fs'

import { g_component_dir } from '../templates'

export default async function generateFile(arg: string, targetPath: string) {
  const args = arg.split(' ').filter(Boolean)

  const name = args[0]

  await g_component_dir([name], targetPath)
}
