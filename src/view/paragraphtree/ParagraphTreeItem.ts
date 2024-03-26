import * as vscode from 'vscode';
import * as path from 'path';

export default class ParagraphTreeItem extends vscode.TreeItem {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.iconPath = (collapsibleState !== vscode.TreeItemCollapsibleState.None)
      ? path.join(__filename, '..', '..', '..', '..', 'media', 'paragraph-svgrepo-com.svg')
      : undefined;
  }
}
