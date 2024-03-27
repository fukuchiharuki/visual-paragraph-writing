import * as vscode from 'vscode';
import ParagraphTreeDataProvider from './ParagraphTreeDataProvider';
import convertTextToParagraphs from '../../model/text/service/convertTextToParagraphs';
import TextElement from '../../model/text/TextElement';
import { isSentence } from '../../model/text/Sentence';

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

  collapseAll() {
    this.dataProvider.collapseAll();
  }

  onDidExpandElement(element: TextElement) {
    this.dataProvider.onDidExpandElement(element);
  }

  onDidCollapseElement(element: TextElement) {
    this.dataProvider.onDidCollapseElement(element);
  }

  onDidChangeSelection(selection: TextElement) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const lineNumber = isSentence(selection)
        ? selection.lineNumber
        : selection.content[0].lineNumber;
      const position = new vscode.Position(lineNumber, 0);
      editor.selection = new vscode.Selection(position, position);
      editor.revealRange(
        new vscode.Range(position, position),
        vscode.TextEditorRevealType.AtTop
      );
    }
  }
}
