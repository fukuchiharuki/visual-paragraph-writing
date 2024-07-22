import * as vscode from 'vscode';
import debounce from '../../util/debounce';
import ParagraphTextView from '../paragraphtext/ParagraphTextView';

export default function useParagraphTextView() {
  const paragraphTextView = new ParagraphTextView();
  const textView = paragraphTextView.register();
  const handlers = attachEventHandlers();
  initialize();

  return { disposables: [textView, ...handlers] };

  function attachEventHandlers(): vscode.Disposable[] {
    return [
      // アクティブなテキストエディターの変更に伴うサイドバーの更新
      vscode.window.onDidChangeActiveTextEditor(editor => {
        debounce(() => reflect(editor));
      }),

      // テキスト本文の変更に伴うサイドバーの更新
      vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
          debounce(() => refresh(event.document, getLineNumber(editor)));
        }
      }),
    ];
  }

  function initialize() {
    reflect(vscode.window.activeTextEditor);
  }

  function reflect(editor: vscode.TextEditor | undefined) {
    if (editor) {
      refresh(editor.document, getLineNumber(editor));
    }
  }

  function refresh(document: vscode.TextDocument, lineNumber: number) {
    paragraphTextView.refresh(document, lineNumber);
  }
}

function getLineNumber(editor: vscode.TextEditor): number {
  const cursorPosition = editor.selection.active;
  return cursorPosition.line;
}
