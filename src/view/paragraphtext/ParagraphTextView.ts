import * as vscode from 'vscode';
import ParagraphTextViewProvider from './ParagraphTextViewProvider';
import convertTextToParagraphs from '../../model/text/service/convertTextToParagraphs';

export default class ParagraphTextView {
  constructor(
    private readonly provider: ParagraphTextViewProvider = new ParagraphTextViewProvider()
  ) {}

  register(): vscode.Disposable {
    return vscode.window.registerWebviewViewProvider(
      "paragraphTextSidebarView",
      this.provider
    );
  }

  refresh(document: vscode.TextDocument, lineNumber: number) {
    const paragraphs = convertTextToParagraphs(document.getText());
    const paragraph = paragraphs.find((paragraph) =>
      paragraph.content.some((sentence) => sentence.lineNumber === lineNumber)
    );
    paragraph && this.provider.refresh(paragraph);
  }
}
