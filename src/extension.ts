import * as vscode from 'vscode';
import useParagraphTreeView from './view/paragraphtree/useParagraphTreeView';
import useParagraphTextView from './view/paragraphtext/useParagraphTextView';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  setupParagraphTreeView(context);
  setupParagraphTextView(context);
}

function setupParagraphTreeView(context: vscode.ExtensionContext) {
  const { disposables } = useParagraphTreeView();
  disposables.forEach(it => context.subscriptions.push(it));
}

function setupParagraphTextView(context: vscode.ExtensionContext) {
  const { disposables } = useParagraphTextView();
  disposables.forEach(it => context.subscriptions.push(it));
}

// This method is called when your extension is deactivated
export function deactivate() {}
