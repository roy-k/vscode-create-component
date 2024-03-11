// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

import reactCommand from './packages/react'
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // createComponent
  const reactFun = vscode.commands.registerCommand(
    'extension.reactCreate',
    reactCommand
  )
  // const vueFun = vscode.commands.registerCommand('extension.vueCreate', vueHandler)

  context.subscriptions.push(...[reactFun])
}

// this method is called when your extension is deactivated
export function deactivate() {}
