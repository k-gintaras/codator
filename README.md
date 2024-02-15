# codator README

GPT Fast Code generating assistant using shortcut CTRL ALT Q

## Features

On shortcut CTRL ALT Q will query gpt 3 turbo
whichever line is not empty will be a prompt (current line, above line, selected text)
response will be below
progress can be seen in vs code bottom

## Requirements

you have to enter your own gpt token in extension settings or package
this is so you dont use mine

## Extension Settings

"contributes": {
"configuration": {
"title": "GPT Extension Settings",
"properties": {
"gptExtension.gptKey": {
"type": "string",
"default": "",
"description": "Enter your GPT API Key here."
}
}
},
"commands": [
{
"command": "codator.getGptCode",
"title": "Get Fast Gpt Response"
}
],
"keybindings": [
{
"command": "codator.getGptCode",
"key": "ctrl+alt+q",
"when": "editorTextFocus"
}
]
},

## Known Issues

if gpt servers dont work, there will be error after few seconds

## Release Notes

first release, one feature, ctrl alt q to generate gpt 3 turbo response

### 1.0.0

Initial release

### 1.0.1

this is not yet released, this is just a placeholder to remind me of this readme format...

## Following extension guidelines

add gpt token to settings or package json and ensure ctrl alt q is not already in use

this is part of my readme, make it a bit nicer please

## Starting your own extension

vs code extension
npm install -g yo generator-code
yo code

you can then compile and package into extension.vsix and simply install it without publishing
you will need to setup git repo in package json

```json
  "name": "ExtensionName",
  "displayName": "extensionname",
  "description": "description",
  "version": "0.0.1",
  "repository": {
    "type": "git",
    "url": "https://github.com/..."
  },
```

edit README.md
add LICENSE.md

## Compilation tips

`npm run compile`
this will run webpack
ensure that `.vscodeignore` is setup to ignore certain files

ensure `package.json` has this setup

```json
"main": "./out/extension.js",
"scripts": {
  "compile": "webpack --mode production"
}
```

`vsce package`

## Webpack tips

`npm install --save-dev webpack webpack-cli ts-loader`

Create a `webpack.config.js` in your project root:

```javascript
const path = require('path');

module.exports = {
  target: 'node', // Important: This makes sure __dirname behaves as expected
  entry: './src/extension.ts', // Assume your main file is src/extension.ts
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode', // Important: This excludes the vscode module which is provided by the runtime
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve both TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};
```

## Installation tips

After packaging your Visual Studio Code (VS Code) extension into a .vsix file, you can install it permanently in your VS Code environment for your use. Here’s how to do it:

1. Install the Packaged .vsix Extension
   Via VS Code GUI:

Open VS Code.
Go to the Extensions view by clicking on the square icon on the sidebar or pressing Ctrl+Shift+X (Windows/Linux) or Cmd+Shift+X (macOS).
Click on the ... at the top-right corner of the Extensions view and select Install from VSIX....
Navigate to the location of your .vsix file, select it, and click 'Open' to install.
Via Command Line:
You can also install the .vsix file using the code command line interface. Open a terminal or command prompt and run:

sh
Copy code
code --install-extension path/to/your-extension.vsix
Replace path/to/your-extension.vsix with the actual file path to your .vsix file.

2. Ensure the Extension is Enabled
   After installation, your extension should be automatically enabled. You can verify this by going to the Extensions view in VS Code and searching for your extension by its name. If it's installed correctly, it should appear in the list of installed extensions. If it's disabled for some reason, you can enable it from there.

3. Using the Extension
   Now that your extension is installed and enabled, you can start using it as intended. Depending on your extension's functionality, this might mean accessing new commands in the Command Palette (Ctrl+Shift+P or Cmd+Shift+P), new UI elements, or other integration points within VS Code.

Making it "Permanent"
Installing the .vsix file as described makes the extension a permanent part of your VS Code setup, persisting across sessions and restarts just like any extension installed from the VS Code Marketplace. However, there are a few points to consider for long-term maintenance:

Updates: If you make changes to your extension, you'll need to re-package and re-install the .vsix file to update the installed version in your VS Code. This process is manual since the extension isn't coming from the Marketplace.

VS Code Updates: Ensure your extension remains compatible with new VS Code updates. Occasionally, API changes or deprecations might require you to update your extension's code.

Backup: Consider backing up your .vsix file and source code to easily reinstall the extension if needed, for example, when setting up a new machine or recovering from a system reset.

By following these steps, you can install and use your VS Code extension indefinitely for your personal use, enjoying the custom functionality it adds to your development environment.

**Enjoy!**
