import * as vscode from 'vscode';
import GptService from '../openai/gptApiRequest';
import { getSelectedTextOrCurrentLine } from './textHelper';

export async function handleGptCodeCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('No editor is active');
    return;
  }

  let text = getSelectedTextOrCurrentLine(editor);
  if (!text.trim()) {
    vscode.window.showInformationMessage('No text selected or current line is empty');
    return;
  }

  await communicateWithGptAndInsertResponse(editor, text);
}

async function communicateWithGptAndInsertResponse(editor: vscode.TextEditor, text: string) {
  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Window,
      title: 'Communicating with GPT...',
      cancellable: false,
    },
    async (progress) => {
      try {
        const gptKey = getGptKey();
        const gptService = new GptService(gptKey);
        const response = await gptService.getFastGptCode(text);
        editor.edit((editBuilder) => {
          const position = editor.selection.end;
          editBuilder.insert(position.with(position.line + 1, 0), '\n\n' + response + '\n\n');
        });
      } catch (error) {
        error instanceof Error
          ? vscode.window.showErrorMessage(`Error communicating with GPT: ${error.message}`)
          : vscode.window.showErrorMessage(`Error communicating with GPT: Unexpected error type - ${String(error)}`);
      }
    }
  );
}

function getGptKey(): string {
  const config = vscode.workspace.getConfiguration('gptExtension');
  const gptKey = config.get<string>('gptKey', '');
  if (!gptKey) {
    vscode.window.showWarningMessage('GPT API Key is not set. Please configure it in the extension settings.');
  }
  return gptKey;
}
