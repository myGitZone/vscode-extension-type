// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as sidebar from './test';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ts-tpey" is now active!');

	//注册侧边栏面板的实现
	const sidebar_test = new sidebar.EntryList();
	vscode.window.registerTreeDataProvider("api-list", sidebar_test);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('api-list.openChild', (args) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		console.log(111, args);
		vscode.window.activeTextEditor?.edit(editBuilder => {
			// 从开始到结束，全量替换
			const activeTextEditor = vscode.window.activeTextEditor;

			const text = '新替换的内容';
			const start = activeTextEditor!.selection.start;
			const requestData = ['console.log(1234)', 'console.log(1234333)'];
			const end = new vscode.Position(start.line + requestData.length, 0);
			const selection = new vscode.Selection(start, end);
			let insertStr = requestData.reduce((result, current)=>{
				return `${result}
					${current}`;
			}, '');
			activeTextEditor?.insertSnippet(new vscode.SnippetString(insertStr));
			activeTextEditor!.selection = selection;
			vscode.commands.executeCommand('editor.action.formatSelection');
		});
		// vscode.window.showInformationMessage(args);
	});

	let disposable1 = vscode.commands.registerCommand('api-list-root.openChild', (args) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		console.log(2222, args);

		// vscode.window.showInformationMessage(args);
	});

	let disposable2 = vscode.commands.registerCommand('ts-tpey.refresh', (args) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		console.log(3333, args);
		// vscode.window.showInformationMessage(args);
	});

	context.subscriptions.push(disposable, disposable1, disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() { }
