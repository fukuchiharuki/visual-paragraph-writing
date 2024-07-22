import * as vscode from "vscode";
import CollapsibleParagraphTreeDataProvider from "./CollapsibleParagraphTreeDataProvider";
import convertTextToParagraphs from "../../model/text/service/convertTextToParagraphs";
import TextElement from "../../model/text/TextElement";
import UncollapsibleParagraphTreeDataProvider from "./UncollapsibleParagraphTreeDataProvider";

type ParagraphTreeViewProvider =
  | CollapsibleParagraphTreeDataProvider
  | UncollapsibleParagraphTreeDataProvider;

export default class ParagraphTreeView {
  constructor(private readonly dataProvider: ParagraphTreeViewProvider) {}

  register(): vscode.TreeView<TextElement> {
    return vscode.window.createTreeView("paragraphTreeSidebarView", {
      treeDataProvider: this.dataProvider,
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

  async onDidChangeSelection(element: TextElement) {
    const lineNumber = this.dataProvider.onDidChangeSelection(element);
    const editor = vscode.window.activeTextEditor;
    if (lineNumber !== null && editor) {
      const position = new vscode.Position(lineNumber, 0);
      editor.selection = new vscode.Selection(position, position);
      editor.revealRange(
        new vscode.Range(position, position),
        vscode.TextEditorRevealType.AtTop,
      );
      await vscode.window.showTextDocument(editor.document, editor.viewColumn);
    }
  }
}
