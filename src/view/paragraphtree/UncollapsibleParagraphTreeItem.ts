import * as vscode from 'vscode';
import * as path from 'path';

export default class UncollapsibleParagraphTreeItem extends vscode.TreeItem {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
  ) {
    super(label, collapsibleState);
    this.iconPath = path.join(__filename, '..', '..', '..', '..', 'media', 'paragraph-svgrepo-com.svg');
  }
}
