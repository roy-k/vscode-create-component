// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import generateFile from './models/generateFile'
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	 // createComponent
    const fc = vscode.commands.registerCommand('extension.createComponent', function (param) {
        // 文件夹绝对路径
        const folderPath = param.fsPath;

        const options = {
            prompt: "请输入组件名: ",
            placeHolder: "组件名称 / 组件名.ts/tsx / 组件名 less / 组件名 less module"
        }
        
        // 调出系统输入框获取组件名
        vscode.window.showInputBox(options).then(value => {
            if (!value) return;

            generateFile(value, folderPath).then(() => {
                // vscode
            }, (error) => {
                vscode.window.showInformationMessage(JSON.stringify(error))
            })
        });
    });
    
    context.subscriptions.push(fc);
}

// this method is called when your extension is deactivated
export function deactivate() {}
