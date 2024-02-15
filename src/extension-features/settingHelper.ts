import * as vscode from 'vscode';

function getSetting(key: string): string {
  // Explicitly specify the section of the configuration to access
  const config = vscode.workspace.getConfiguration('gptExtension');
  const gptKey = config.get<string>(key, '');
  if (!gptKey) {
    vscode.window.showWarningMessage(`${key} Key is not set. Please configure it in the extension settings.`);
  }
  return gptKey;
}
