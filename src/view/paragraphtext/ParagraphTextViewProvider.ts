import * as vscode from 'vscode';
import Paragraph from '../../model/text/Paragraph';

export default class ParagraphTextViewProvider implements vscode.WebviewViewProvider {
  constructor() {}

  private view?: vscode.WebviewView;

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    // context: vscode.WebviewViewResolveContext,
    // token: vscode.CancellationToken
  ): Thenable<void> | void {
    this.view = webviewView;
    webviewView.webview.html = generateHtml();
  }

  refresh(paragraph: Paragraph) {
    this.view && (this.view.webview.html = generateHtml(paragraph));
  }
}

function generateHtml(paragraph?: Paragraph): string {
  const sentences = paragraph?.content
    ?.map((sentence) => sentence.content)
    ?.map((text) => `<span>${text}</span>`)
    ?.join('\n');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Paragraph</title>
    </head>
    <body>${sentences || ''}</body>
    </html>
  `;
}
