import * as vscode from 'vscode';
import ParagraphTextViewProvider from './ParagraphTextViewProvider';

export default class ParagraphTextView {
  constructor() {}

  register(): vscode.Disposable {
    return vscode.window.registerWebviewViewProvider(
      "paragraphTextSidebarView",
      new ParagraphTextViewProvider()
    );
  }

  refresh(document: vscode.TextDocument) {
  }
}
