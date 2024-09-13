
## Description

`explainer.js` is a command-line interface (CLI) tool designed to process code files and output the code blocks with explanations as comments. This tool utilizes a Groq-based API to provide detailed explanations of the code structure, functionality, and logic.

## Installation

Before using the tool, ensure you have Node.js installed. You can then install dependencies by running:

```bash
npm install
```

## Setup Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```bash
API_KEY=your-api-key-here
```

The `.env` file allows you to configure API keys and other options for the tool.

## Usage

To use the tool, run the following command:

```bash
node index.js <file> [options]
```

## Options

- `-a, --api-key [your-key]`: Defines the API key to use for processing (can also be set in the `.env` file). **Required**.
- `-b, --baseURL [url]`: Defines the base URL of the API for processing. Defaults to `https://api.groq.com/`.
- `-m, --model [model-name]`: Defines the model to use for processing. Defaults to `llama-3.1-70b-versatile`.
- `-o, --output [file.type]`: Defines the output file for the processed content. Defaults to `explainer_output.txt`.
- `-t, --temperature [number]`: Defines the temperature parameter for generating explanations (range between 0 and 2). Defaults to `1`.

## Example

```bash
node explainer.js myCodeFile.js -a your-api-key -o explainedFile.js -t 0.7
```