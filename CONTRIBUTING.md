Here’s the updated **Contributing to Explainer.js** guide with definitions and usage examples for all the scripts in your `package.json`:

---

# Contributing to Explainer.js

Thank you for taking your time to contribute! Before filing an issue check preexisting [issues](https://github.com/aamfahim/explainer.js/issues) to ensure there's no duplication. If you would like to work on an issue, leave a comment.

## Get Started

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

## Scripts

1. **Run Prettier on the Entire Codebase**

    Runs Prettier to format all files in the codebase according to the configured style.

    ```bash
    npm run prettier
    ```

2. **Check Prettier Formatting**

    Checks if files in the codebase are formatted according to Prettier without making any changes. Useful for verifying formatting compliance.

    ```bash
    npm run prettier:check
    ```

3. **Run Prettier on a Specific File**

    Formats a single specified file using Prettier. Replace `<file-path>` with the path to the file you want to format.

    ```bash
    npm run prettier:file <file-path>
    ```

4. **Run ESLint on the Entire Codebase**

    Runs ESLint to identify any linting errors or warnings across the entire codebase.

    ```bash
    npm run lint
    ```

5. **Check ESLint Errors**

    Runs ESLint in check mode to list any linting issues without fixing them. This script will display both errors and warnings.

    ```bash
    npm run lint:check
    ```

6. **Run ESLint on a Specific File**

    Runs ESLint on a single specified file to check for linting issues. Replace `<file-path>` with the path to the file you want to lint.

    ```bash
    npm run lint:file <file-path>
    ```

7. **Run Prettier and Linter in Sequence**

    Runs both Prettier and ESLint in sequence on the entire codebase to ensure consistent styling and code quality.

    ```bash
    npm run clean
    ```

There is a pre-commit hook that will automatically run prettier and linter on the staged files as well.
