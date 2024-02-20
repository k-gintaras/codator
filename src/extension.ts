import * as vscode from 'vscode';
import { handleGptCodeCommand } from './extension-features/gptCodeCommands';
import { handleGptAdviceCommand } from './extension-features/gptAdviceCommands';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('codator.getGptCode', handleGptCodeCommand)); // add another command like this but to format lines
  context.subscriptions.push(vscode.commands.registerCommand('codator.getGptAdvice', handleGptAdviceCommand)); // add another command like this but to format lines
}

export function deactivate() {}
