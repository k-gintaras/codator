import { TextEditor } from 'vscode';

export function getSelectedTextOrCurrentLine(editor: TextEditor): string {
  let text = editor.document.getText(editor.selection).replace('`', '');
  if (!text) {
    const cursorPosition = editor.selection.start;
    const line = editor.document.lineAt(cursorPosition.line);
    text = line.isEmptyOrWhitespace && cursorPosition.line > 0 ? editor.document.lineAt(cursorPosition.line - 1).text : line.text;
  }
  return text;
}
