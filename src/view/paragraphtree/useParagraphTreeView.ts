import * as vscode from 'vscode';
import ParagraphTreeView from './ParagraphTreeView';
import debounce from '../../util/debounce';
import UncollapsibleParagraphTreeDataProvider from './UncollapsibleParagraphTreeDataProvider';
import ParagraphTextView from '../paragraphtext/ParagraphTextView';

export default function useParagraphTreeView() {
  const paragraphTreeView = new ParagraphTreeView(new UncollapsibleParagraphTreeDataProvider());
  const treeView = paragraphTreeView.register();
  const paragraphTextView = new ParagraphTextView();
  const textView = paragraphTextView.register();
  const handlers = attachEventHandlers();
  initialize();

  return { disposables: [treeView, textView, ...handlers] };

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
          debounce(() => refresh(event.document));
        }
      }),

      // すべて閉じるボタンによるサイドバーの更新
      vscode.commands.registerCommand('visual-paragraph-writing.collapseAll', () => {
        paragraphTreeView.collapseAll();
      }),

      // 開操作による内部状態の更新
      treeView.onDidExpandElement(event => {
        paragraphTreeView.onDidExpandElement(event.element);
      }),

      // 閉操作による内部状態の更新
      treeView.onDidCollapseElement(event => {
        paragraphTreeView.onDidCollapseElement(event.element);
      }),

      // クリックによるテキストエディター上のジャンプ
      treeView.onDidChangeSelection(event => {
        const selection = event.selection;
        if (selection && selection.length) {
          paragraphTreeView.onDidChangeSelection(selection[0]);
        }
      }),
    ];
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
