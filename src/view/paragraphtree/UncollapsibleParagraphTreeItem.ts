import * as vscode from "vscode";
import paragraphIcon from "../../icon/paragraph";

export default class UncollapsibleParagraphTreeItem extends vscode.TreeItem {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None,
  ) {
    super(label, collapsibleState);
    this.iconPath = paragraphIcon();
  }
}
