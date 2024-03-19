import * as vscode from 'vscode';
import ParagraphTreeDataProvider from './ParagraphTreeDataProvider';
import convertTextToParagraphs from '../../model/text/service/convertTextToParagraphs';

export default class ParagraphTreeView {
  constructor(
    private dataProvider: ParagraphTreeDataProvider = new ParagraphTreeDataProvider()
  ) {}

  register(): vscode.Disposable {
    return vscode.window.registerTreeDataProvider('paragraphTreeSidebarView', this.dataProvider);
  }

  refresh(document: vscode.TextDocument) {
    this.dataProvider.refresh(convertTextToParagraphs(document.getText()));
  }
}
