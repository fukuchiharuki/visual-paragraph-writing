import * as vscode from 'vscode';
import { isSentence } from '../../model/text/Sentence';
import TextElement from '../../model/text/TextElement';

export default class ParagraphTreeDataProvider implements vscode.TreeDataProvider<TextElement> {
  constructor(private elements: TextElement[] = []) { }

  private _onDidChangeTreeData: vscode.EventEmitter<TextElement | undefined> =
    new vscode.EventEmitter<TextElement | undefined>();

  readonly onDidChangeTreeData: vscode.Event<TextElement | undefined> = this._onDidChangeTreeData.event;

  refresh(elements: TextElement[]): void {
    this.elements = elements;
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: TextElement): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return isSentence(element)
      ? new vscode.TreeItem(element.content, vscode.TreeItemCollapsibleState.None)
      : new vscode.TreeItem(element.content[0].content, vscode.TreeItemCollapsibleState.None);
  }

  getChildren(element?: TextElement | undefined): vscode.ProviderResult<TextElement[]> {
    return element
      ? isSentence(element)
        ? []
        : element.content
      : this.elements;
  }
}
