# Explainer.js

CLI tool to process files and output the code blocks along with explanation, using various configuration options like API key, base URL, model name, and temperature.

Built using [Commander.js](https://www.npmjs.com/package/commander) and [Groq SDK](https://console.groq.com/docs/libraries)!

![Demo](https://github.com/user-attachments/assets/3ba2bdcb-a5a9-4b5a-bca2-d773a7dc75d8)


## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Options](#options)
5. [Arguments](#arguments)
6. [Usage](#usage)
7. [TOML Configuration](#toml-configuration)
8. [Version](#version)

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
- **TOML Config Override**: Uses a TOML config file `.explainer-config.toml` in the `home` directory that contains any or all of the options supported giving precedence to CLI options over TOML config file options.

## Prerequisites

- Have latest stable(LTS) version of [node.js](https://nodejs.org/en) installed.
- Optional: A valid `.env` file with API credentials with all typed out.

## Installation

```bash
  npm install -g explainer
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

- `<files>`: **(Required)** path of the files or directories to process.

## Usage

You can use the CLI to process a file and either print the output to the console or save it to a specified file.

You can run this following command to get information regarding the tool in the terminal.

```bash
explainer -h
```

\
If you prefer to do it in the terminal:

```bash
explainer -a <your-api-key> -b <base-url> -m <model-name> -o <output-file> -t <number> <file-path>
```

```bash
explainer ---api-key <your-api-key> -baseURL <base-url> --model <model-name> --output <output-file> ----temperature <number> <file-path>
```

\
Or if you have your API_KEY defined in `.env` you can just run the following:

```bash
explainer examples/bubble_sort.js
```

or

```bash
explainer examples/bubble_sort.js examples/selection_sort.js
```

## TOML Configuration

You can create a [TOML](https://toml.io/en/) `.explainer-config.toml` config file that contains all of your options for the tool and place it in your `home` directory, i.e. (or simply modify and copy the one that is in the `examples directory`):

To copy to your home directory, if you're using a `Linux` or `Powershell` terminal:

```bash
cp examples/.explainer-config.toml ~
```

If you're using a `Command Prompt` terminal:

```bash
copy examples\.explainer-config.toml %USERPROFILE%
```

Any of these config options can or can not be provided in the .toml file, as in, you may provide one or two options in the `.toml` file, and provide the rest via the CLI!  
`Note:` for the tool to work, you must provide the apiKey in either the `.toml`/`.env` files, or via the `command line`

```toml
apiKey = "YOUR_API_KEY"
baseURL = "https://api.groq.com/"
temperature = 1 # between 0 and 2
model = "llama-3.1-70b-versatile" # any supported model
output = "output.txt" # will overwrite a file with the same name
tokenUsage = false # can be true or false
```

The tool will automatically detect and use that file if it exists, however, you do have the option to override and options in the `TOML` file using CLI options.

## Version

This tool outputs the current version of the package from `package.json` when you pass the `-v` or `--version` flag.
