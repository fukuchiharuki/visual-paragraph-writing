import * as vscode from 'vscode';
import ParagraphTreeDataProvider from './ParagraphTreeDataProvider';
import convertTextToParagraphs from '../../model/text/service/convertTextToParagraphs';
import TextElement from '../../model/text/TextElement';

export default class ParagraphTreeView {
  constructor(
    private dataProvider: ParagraphTreeDataProvider = new ParagraphTreeDataProvider()
  ) {}

  register(): vscode.TreeView<TextElement> {
    return vscode.window.createTreeView('paragraphTreeSidebarView', {
      treeDataProvider: this.dataProvider
    });
  }

  refresh(document: vscode.TextDocument) {
    this.dataProvider.refresh(convertTextToParagraphs(document.getText()));
  }
}
