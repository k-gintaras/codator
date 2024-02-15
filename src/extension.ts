import * as vscode from 'vscode';
import GptService from './openai/gptApiRequest';
import { getSelectedTextOrCurrentLine } from './extension-features/textHelper';
import { handleGptCodeCommand } from './extension-features/gptCommands';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('codator.getGptCode', handleGptCodeCommand));
}

export function deactivate() {}
