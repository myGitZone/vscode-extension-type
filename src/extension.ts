// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { tsTreeDataProvider } from './explorer/TsTreeDataProvider';
import { apiManager } from './explorer/apiManager';
import { TsTreeNode } from './explorer/TsTreeNode';
import { insertType, openTab } from './utils/tool';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	apiManager.refresh().then(()=>{
		context.subscriptions.push(
			apiManager,
			vscode.commands.registerCommand("typeExplorer.insert", (node: TsTreeNode) => insertType(node.id)),
			vscode.commands.registerCommand("typeExplorer.check", (id: string | undefined) => openTab(id)),
			vscode.window.createTreeView("typeExplorer", { treeDataProvider: tsTreeDataProvider, showCollapseAll: true }),
		);
	});
	// // Use the console to output diagnostic information (console.log) and errors (console.error)
	// // This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "typeexplorer" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('typeexplorer.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from typeExplorer!');
	// });

	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
