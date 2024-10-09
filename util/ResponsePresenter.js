import fs from 'fs';

/**
 * Formats and presents the output response from the provider.
 * Handles saving output to a file or displaying it in the console.
 * Also displays token usage if requested.
 *
 * @param {Array} responses - The response objects from processing files.
 * @param {string} outputFile - The output file path, if specified.
 * @param {boolean} tokenUsage - Whether to display token usage information.
 */
const ResponsePresenter = (responses, outputFile, tokenUsage) => {
    const output = responses.map(response => response.choices[0].message.content).join('\n\n=================================================================================\n\n');

    if (outputFile) {
        fs.writeFileSync(outputFile, output);
        console.log(`File saved to ${outputFile}`);
    } else {
        console.log(output);
    }

    if (tokenUsage) {
        const { totalPromptTokens, totalResponseTokens } = responses.reduce(
            (accumulatedSum, response) => {
                accumulatedSum.totalPromptTokens += response.usage.prompt_tokens;
                accumulatedSum.totalResponseTokens += response.usage.completion_tokens;
                return accumulatedSum;
            },
            { totalPromptTokens: 0, totalResponseTokens: 0 }
        );

        console.log('\n=================================================================================\n');
        console.log('TOTAL PROMPT TOKENS:', totalPromptTokens);
        console.log('TOTAL RESPONSE TOKENS:', totalResponseTokens);
    }
};

export default ResponsePresenter;