import * as vscode from 'vscode';
import useParagraphTreeView from './view/paragraphtree/useParagraphTreeView';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  const { disposables } = useParagraphTreeView();
  disposables.forEach(it => context.subscriptions.push(it));
}

// This method is called when your extension is deactivated
export function deactivate() {}
