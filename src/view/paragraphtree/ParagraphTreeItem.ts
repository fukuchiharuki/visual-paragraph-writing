import * as vscode from "vscode";
import paragraphIcon from "../../icon/paragraph";

export default class ParagraphTreeItem extends vscode.TreeItem {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(label, collapsibleState);
    this.iconPath =
      collapsibleState !== vscode.TreeItemCollapsibleState.None
        ? paragraphIcon()
        : undefined;
  }
}
