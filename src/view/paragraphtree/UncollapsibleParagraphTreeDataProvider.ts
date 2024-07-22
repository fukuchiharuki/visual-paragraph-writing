import * as vscode from 'vscode';
import { isSentence } from '../../model/text/Sentence';
import TextElement from '../../model/text/TextElement';
import IdPayoutMachine from './IdPayoutMachine';
import Paragraph from '../../model/text/Paragraph';
import UncollapsibleParagraphTreeItem from './UncollapsibleParagraphTreeItem';

export default class UncollapsibleParagraphTreeDataProvider
  implements vscode.TreeDataProvider<TextElement>
{
  private idPayoutMachine = new IdPayoutMachine();

  constructor(private elements: TextElement[] = []) {}

  private _onDidChangeTreeData: vscode.EventEmitter<TextElement | undefined> =
    new vscode.EventEmitter<TextElement | undefined>();

  readonly onDidChangeTreeData: vscode.Event<TextElement | undefined> =
    this._onDidChangeTreeData.event;

  refresh(elements: TextElement[]): void {
    this.elements = elements;
    this._onDidChangeTreeData.fire(undefined);
    this.idPayoutMachine.reset();
  }

  collapseAll(): void {
    // do nothing
  }

  onDidExpandElement(element: TextElement) {
    // do nothing
  }

  onDidCollapseElement(element: TextElement) {
    // do nothing
  }

  onDidChangeSelection(element: TextElement): number | null {
    return this.checkNotSentence(
      element,
      (paragraph) => paragraph.content[0].lineNumber
    );
  }

  getTreeItem(element: TextElement): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return this.checkNotSentence(
      element,
      (paragraph) =>
        new UncollapsibleParagraphTreeItem(
          this.idPayoutMachine.payout(element),
          paragraph.content[0].content
        )
    );
  }

  private checkNotSentence<T>(element: TextElement, block: (paragraph: Paragraph) => T): T {
    if (isSentence(element)) {
      throw new Error("should not be reached");
    }
    return block(element);
  }

  getChildren(element?: TextElement | undefined): vscode.ProviderResult<TextElement[]> {
    return element ? [] : this.elements;
  }
}
