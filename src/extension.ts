// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jsx-classnames-to-cssmodules" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('jsx-classnames-to-cssmodules.convertJsxClassNamesToCssModules', () => {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		const prefix = vscode.workspace.getConfiguration('jsx-classnames-to-css-modules').get('prefix');

		let matches = 0;
		if (editor) {
			const document = editor.document;
			editor.edit(editBuilder => {
				let word = document.getText();
				matches = word.match(/className\="(.+)"/gm)?.length || 0;
				word = word.replace(/className\="(.+)"/gm, `className={${prefix}$1}`);
				var firstLine = document.lineAt(0);
				var lastLine = document.lineAt(document.lineCount - 1);
				var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
				editBuilder.replace(textRange, word);
			})
		}
		
		if (matches > 0) {
			vscode.window.showInformationMessage(`Converted ${matches} occurences in the current file !`);
		} else {
			vscode.window.showInformationMessage('No occurences to convert.');
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
