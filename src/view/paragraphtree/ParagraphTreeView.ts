import * as vscode from 'vscode';
import CollapsibleParagraphTreeDataProvider from './CollapsibleParagraphTreeDataProvider';
import convertTextToParagraphs from '../../model/text/service/convertTextToParagraphs';
import TextElement from '../../model/text/TextElement';
import { isSentence } from '../../model/text/Sentence';

export default class ParagraphTreeView {
  constructor(
    private dataProvider: CollapsibleParagraphTreeDataProvider = new CollapsibleParagraphTreeDataProvider()
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
    if (!isSentence(selection)) {
      return;
    }
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const lineNumber = selection.lineNumber;
      const position = new vscode.Position(lineNumber, 0);
      editor.selection = new vscode.Selection(position, position);
      editor.revealRange(
        new vscode.Range(position, position),
        vscode.TextEditorRevealType.AtTop
      );
      vscode.window.showTextDocument(editor.document, editor.viewColumn);
    }
  }
}
