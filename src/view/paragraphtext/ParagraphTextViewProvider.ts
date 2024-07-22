import * as vscode from 'vscode';

export default class ParagraphTextViewProvider implements vscode.WebviewViewProvider {
  constructor() {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): Thenable<void> | void {
    webviewView.webview.html = getHtmlForWebview(webviewView.webview);
  }
}

function getHtmlForWebview(webview: vscode.Webview): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebView</title>
    </head>
    <body>
        <h1>Hello from WebView in Sidebar!</h1>
    </body>
    </html>
  `;
}
