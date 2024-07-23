import * as vscode from "vscode";
import { isSentence } from "../../model/text/Sentence";
import TextElement from "../../model/text/TextElement";
import ParagraphTreeItem from "./ParagraphTreeItem";
import IdPayoutMachine from "./IdPayoutMachine";
import CollapsibleStatesHolder from "./CollapsibleStatesHolder";

export default class CollapsibleParagraphTreeDataProvider
  implements vscode.TreeDataProvider<TextElement>
{
  private idPayoutMachine = new IdPayoutMachine();
  private collapsibleStates = new CollapsibleStatesHolder(this.idPayoutMachine);

  constructor(private elements: TextElement[] = []) {}

  private _onDidChangeTreeData: vscode.EventEmitter<TextElement | undefined> =
    new vscode.EventEmitter<TextElement | undefined>();

  readonly onDidChangeTreeData: vscode.Event<TextElement | undefined> =
    this._onDidChangeTreeData.event;

  refresh(elements: TextElement[]): void {
    this.elements = elements;
    this._onDidChangeTreeData.fire(undefined);
    this.idPayoutMachine.reset();
    this.collapsibleStates.reset(elements);
  }

  collapseAll(): void {
    this._onDidChangeTreeData.fire(undefined);
    this.collapsibleStates.collapseAll();
  }

  onDidExpandElement(element: TextElement) {
    this.collapsibleStates.set(element, true);
  }

  onDidCollapseElement(element: TextElement) {
    this.collapsibleStates.set(element, false);
  }

  onDidChangeSelection(element: TextElement): number | null {
    if (!isSentence(element)) {
      return null;
    }
    return element.lineNumber;
  }

  getTreeItem(
    element: TextElement,
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return isSentence(element)
      ? new ParagraphTreeItem(
          this.idPayoutMachine.payout(element),
          element.content,
          vscode.TreeItemCollapsibleState.None,
        )
      : new ParagraphTreeItem(
          this.idPayoutMachine.payout(element),
          element.content[0].content,
          this.collapsibleStates.get(element)
            ? vscode.TreeItemCollapsibleState.Expanded
            : vscode.TreeItemCollapsibleState.Collapsed,
        );
  }

  getChildren(
    element?: TextElement | undefined,
  ): vscode.ProviderResult<TextElement[]> {
    return element
      ? isSentence(element)
        ? []
        : element.content
      : this.elements;
  }
}
