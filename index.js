import fs from 'fs';
import 'dotenv/config';
import { Command, Option } from "commander";
import GroqInstance from './util/GroqInstance.js';
import BuildFilePrompt from './util/BuildFilePrompt.js';
import ProcessFileWithProvider from './util/ProcessFileWithProvider.js';
import TemperatureChecker from './util/TemperatureChecker.js';
import FilePathResolver from './util/FilePathResolver.js';
import TomlChecker from './util/TomlChecker.js';

const packageJSON = JSON.parse(fs.readFileSync('./package.json'));
const program = new Command();


program
  .version(packageJSON.version, '-v, --version', 'output the current version')
  .description(packageJSON.description)

program
  .addOption(new Option('-a, --api-key <your-key>', 'define API key to use for processing defined in .env file').env('API_KEY'))
  .addOption(new Option('-b, --baseURL <url>', 'define the base URL to use for processing defined in .env file').default('https://api.groq.com/').env('BASE_URL'))
  .addOption(new Option('-m, --model <model-name>', 'define the model to use for processing').default('llama-3.1-70b-versatile').env('MODEL_NAME'))
  .addOption(new Option('-o, --output <file>', 'define an output file with valid extension to be able access the output'))
  .addOption(new Option('-t, --temperature <number>', 'define temperature of chat completion between 0 to 2').default(1).argParser(parseFloat))
  .addOption(new Option('-u, --token-usage', 'specify if you want to see tokens that were sent in the prompt and the number of tokens that were returned'))
  .addOption(new Option('-l, --toml <file>', 'specify if you want to use a custom toml config file that contains all of your options'));




  program.argument('<files...>', 'path of the files or directories to process')
  .action(async (files, options) => {
    try {
      const tomlConfig = TomlChecker(options.toml);
      // check for configs provided in toml file
      const apiKey = options.apiKey || tomlConfig.apiKey;
      const baseURL = options.baseURL || tomlConfig.baseURL;
      const temp = options.temperature || tomlConfig.temperature;
      const model = options.model || tomlConfig.model;
      const outputFile = options.output || tomlConfig.output;
      const tokenUsage = options.tokenUsage || tomlConfig.tokenUsage;      
      
      const resolvedFiles = FilePathResolver(files);
      const Groq = GroqInstance(apiKey, baseURL);
      const Temperature = TemperatureChecker(temp);
      console.log('Processing request with provider...');
      const responses = await Promise.all(resolvedFiles.map(async (file) => {
        const response = await ProcessFileWithProvider(
          Groq,
          BuildFilePrompt(file),
          model,
          Temperature
        );

        return {
          content: response.choices[0].message.content,
          tokensInfo: {
            prompt: response.usage.prompt_tokens,
            response: response.usage.completion_tokens
          }
        };
      }));
      
      const output = responses.map(response => response.content).join('\n\n=================================================================================\n\n'); 
      if (outputFile) {
        fs.writeFileSync(outputFile, output); // Save all responses to the output file
        console.log(`File saved to ${outputFile}`);
      } else {
        console.log(output);
      }

      if (tokenUsage) {
        const { totalPromptTokens, totalResponseTokens } = responses.reduce(
          (accumulatedSum, response) => {
            accumulatedSum.totalPromptTokens += response.tokensInfo.prompt;
            accumulatedSum.totalResponseTokens += response.tokensInfo.response;
            return accumulatedSum;
          },
          { totalPromptTokens: 0, totalResponseTokens: 0 }
        );

        console.log('\n=================================================================================\n');
        console.log('TOTAL PROMPT TOKENS:', totalPromptTokens);
        console.log('TOTAL RESPONSE TOKENS:', totalResponseTokens);
      }
      
      process.exit(0);

    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.showHelpAfterError()
program.parse(process.argv);