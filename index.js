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
  .description('CLI tool to process a file output the code blocks with comments')

program
  .addOption(new Option('-a, --api-key <your-key>', 'define API key to use for processing defined in .env file').env('API_KEY').makeOptionMandatory())
  .addOption(new Option('-b, --baseURL <url>', 'define the base URL to use for processing defined in .env file').default('https://api.groq.com/').env('BASE_URL'))
  .addOption(new Option('-m, --model <model-name>',  'define the model to use for processing').default('llama-3.1-70b-versatile').env('MODEL_NAME'))
  .addOption(new Option('-o, --output <file>', 'define an output file'))
  .addOption(new Option('-t, --temperature <number>', 'define temperature of chat completion between 0 to 2').default(1).argParser(parseFloat))
  


  
program.argument('<./file_path>', 'path of the file to process')
  .action(async (file, options) => {
    try {
      const response = await ProcessFileWithProvider(GroqInstance(options.apiKey, options.baseURL),
                                                     BuildFilePrompt(file),
                                                     options.model,
                                                     TemperatureChecker(options.temperature));

      if(response.choices[0].message.content){
        console.log(response.choices[0].message.content)
      }
      else{
        console.log('No explanation returned by provider.');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

program.showHelpAfterError()
program.parse(process.argv);