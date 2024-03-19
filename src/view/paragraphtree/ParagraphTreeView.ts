import * as vscode from 'vscode';
import ParagraphTreeDataProvider from './ParagraphTreeDataProvider';

export default class ParagraphTreeView {
  constructor(
    private dataProvider: ParagraphTreeDataProvider = new ParagraphTreeDataProvider()
  ) {}

  register(): vscode.Disposable {
    return vscode.window.registerTreeDataProvider('paragraphTreeSidebarView', this.dataProvider);
  }

  refresh(document: vscode.TextDocument) {
    this.dataProvider.refresh(
      document.getText()
        .split('\n')
        .map(it => ({ content: it }))
    );
  }
}
