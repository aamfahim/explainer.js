# Explainer.js

CLI tool to processes a file and output the code blocks along with explanation, using various configuration options like API key, base URL, model name, and temperature.

Built using [Commander.js](https://www.npmjs.com/package/commander) and [Groq SDK](https://console.groq.com/docs/libraries)!

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Options](#options)
5. [Arguments](#arguments)
6. [Usage](#usage)
7. [Version](#version)

## Features

If you are going to be defining custom Base URL and/or Model refer to [Groq Documentation](https://console.groq.com/docs/quickstart).

- **API Key Handling**: Uses an API key from the `.env` file or passed as a command-line argument.
- **Base URL**: Allows the specification of a base URL for the API.
  - Refer to documentation of appropriate provider. File a issue if not supported.
- **Model Selection**: Allows the selection of different models for processing.
  - When choosing a model ensure you are choosing appropriate model for code analysis for expected output. If not sure stick to default model.
- **Output to File**: Supports outputting the result to a file with a valid extension.
  - When passing output file name, ensure it has a text readable extension such as `.txt` or `.md`. Otherwise output will not be accessible.
- **Temperature Control**: Adjust the temperature of the model response, allowing for more or less creativity in the output. Valid temperature is between 0 to 2.
  - Higher the temperature longer the process time.

## Prerequisites

- Have latest stable(LTS) version of [node.js](https://nodejs.org/en) installed.
- Optional: A valid `.env` file with API credentials with all typed out.

## Installation

1. Clone the repository.

   ```bash
   git clone <repository-url>
   ```

   ```bash
   cd <repository-directory>
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Set up your `.env` file with your API key and base URL.

   ```.env
   API_KEY=your-api-key
   ```

## Options

- `-a, --api-key <your-key>`: **(Required)** The API key used for processing. Can be set via the `.env` file (`API_KEY`) or passed as a command-line argument.
- `-b, --baseURL <url>`: The base URL for the API. Default: `https://api.groq.com/`.
- `-m, --model <model-name>`: The model name to use for processing. Default: `llama-3.1-70b-versatile`.
- `-o, --output <file>`: The output file path where the results will be saved.
- `-t, --temperature <number>`: The temperature for the model, ranging from 0 to 2. Default: `1`.
- `-u, --token-usage`: Display number of tokens that were sent in the prompt and the number of tokens that were returned. Default: `false`.
- `-h, --help`: Display the help message for user.
- `-v, --version`: Display the current version of the tool.

## Arguments

- `<files>`: **(Required)** The path to the file or files you want explanation for.

## Usage

You can use the CLI to process a file and either print the output to the console or save it to a specified file.

You can run this following command to get information regarding the tool in the terminal.

```bash
node index.js -h
```

\
If you prefer to do it in the terminal:

```bash
node index.js -a <your-api-key> -b <base-url> -m <model-name> -o <output-file> -t <number> <file-path>
```

```bash
node index.js ---api-key <your-api-key> -baseURL <base-url> --model <model-name> --output <output-file> ----temperature <number> <file-path>
```

\
Or if you have your API_KEY defined in `.env` you can just run the following:

```bash
node index.js examples/bubble_sort.js
```

or

```bash
node index.js examples/bubble_sort.js examples/selection_sort.js
```

## Version

This tool outputs the current version of the package from `package.json` when you pass the `-v` or `--version` flag.
