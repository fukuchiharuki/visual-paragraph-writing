import * as vscode from 'vscode';
import useParagraphTreeView from './view/paragraphtree/useParagraphTreeView';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  const { disposable } = useParagraphTreeView();
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
