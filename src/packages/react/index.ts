// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import generateFile from './models/generateFile'
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export default function (param: any) {
  // 文件夹绝对路径
  const folderPath = param.fsPath

  const options = {
    prompt: '请输入组件名: ',
    placeHolder: '组件名称 / 组件名.page',
  }

  // 调出系统输入框获取组件名
  vscode.window.showInputBox(options).then((value) => {
    if (!value) return

    generateFile(value, folderPath).then(
      () => {
        // vscode
      },
      (error: any) => {
        vscode.window.showInformationMessage(JSON.stringify(error))
      }
    )
  })
}
