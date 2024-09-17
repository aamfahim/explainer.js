import fs from 'fs';
import 'dotenv/config';
import { Command, Option } from "commander";
import GroqInstance from './util/GroqInstance.js';
import BuildFilePrompt from './util/BuildFilePrompt.js';
import ProcessFileWithProvider from './util/ProcessFileWithProvider.js';
import TemperatureChecker from './util/TemperatureChecker.js';

const packageJSON = JSON.parse(fs.readFileSync('./package.json'));
const program = new Command();


program
  .version(packageJSON.version, '-v, --version', 'output the current version')
  .description(packageJSON.description)

program
  .addOption(new Option('-a, --api-key <your-key>', 'define API key to use for processing defined in .env file').env('API_KEY').makeOptionMandatory())
  .addOption(new Option('-b, --baseURL <url>', 'define the base URL to use for processing defined in .env file').default('https://api.groq.com/').env('BASE_URL'))
  .addOption(new Option('-m, --model <model-name>', 'define the model to use for processing').default('llama-3.1-70b-versatile').env('MODEL_NAME'))
  .addOption(new Option('-o, --output <file>', 'define an output file with valid extension to be able access the output'))
  .addOption(new Option('-t, --temperature <number>', 'define temperature of chat completion between 0 to 2').default(1).argParser(parseFloat))




  program.argument('<files...>', 'path of the files to process')
  .action(async (files, options) => {
    try {
      const Groq = GroqInstance(options.apiKey, options.baseURL);
      const Temperature = TemperatureChecker(options.temperature);
      console.log('Processing request with provider...');
      const responses = await Promise.all(files.map(async (file) => {
        const response = await ProcessFileWithProvider(
          Groq,
          BuildFilePrompt(file),
          options.model,
          Temperature
        );
        return response.choices[0].message.content;
      }));
      
      const output = responses.join('\n\n=================================================================================\n\n'); 
      if (options.output) {
        fs.writeFileSync(options.output, output); // Save all responses to the output file
        console.log(`File saved to ${options.output}`);
      } else {
        console.log(output);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

program.showHelpAfterError()
program.parse(process.argv);