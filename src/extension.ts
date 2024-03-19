import * as vscode from 'vscode';
import ParagraphTreeView from './view/paragraphtree/ParagraphTreeView';
import debounce from './util/debounce';

const paragraphTreeView = new ParagraphTreeView();

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(paragraphTreeView.register());
  registerEventHandlers();
  initialize();
}

function registerEventHandlers() {
  vscode.window.onDidChangeActiveTextEditor(editor => {
    debounce(() => reflect(editor));
  });

  vscode.workspace.onDidChangeTextDocument(event => {
		const editor = vscode.window.activeTextEditor;
		if (editor && event.document === editor.document) {
			debounce(() => refresh(event.document));
		}
	});
}

function initialize() {
  reflect(vscode.window.activeTextEditor);
}

function reflect(editor: vscode.TextEditor | undefined) {
  if (editor) {
    refresh(editor.document);
  }
}

function refresh(document: vscode.TextDocument) {
  paragraphTreeView.refresh(document);
}

// This method is called when your extension is deactivated
export function deactivate() {}
