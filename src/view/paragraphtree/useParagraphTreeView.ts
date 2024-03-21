import * as vscode from 'vscode';
import ParagraphTreeView from './ParagraphTreeView';
import debounce from '../../util/debounce';

export default function useParagraphTreeView() {
  const paragraphTreeView = new ParagraphTreeView();
  const treeView = paragraphTreeView.register();
  const handlers = attachEventHandlers();
  initialize();

  return { disposables: [treeView, ...handlers] };

  function attachEventHandlers(): vscode.Disposable[] {
    const disposables: vscode.Disposable[] = [];

    disposables.push(
      vscode.window.onDidChangeActiveTextEditor(editor => {
        debounce(() => reflect(editor));
      })
    );

    disposables.push(
      vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
          debounce(() => refresh(event.document));
        }
      })
    );

    // treeView.onDidExpandElement(event => {
    //   paragraphTreeView.onDidExpandElement(event.element);
    // });

    // treeView.onDidCollapseElement(event => {
    //   paragraphTreeView.onDidCollapseElement(event.element);
    // });

    return disposables;
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
