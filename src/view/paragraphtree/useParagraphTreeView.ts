import * as vscode from 'vscode';
import ParagraphTreeView from './ParagraphTreeView';
import debounce from '../../util/debounce';

export default function useParagraphTreeView() {
  const paragraphTreeView = new ParagraphTreeView();

  const disposable = paragraphTreeView.register();
  attachEventHandlers();
  initialize();

  return { disposable };

  function attachEventHandlers() {
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
}
