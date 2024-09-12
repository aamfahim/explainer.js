import fs from 'fs';
import 'dotenv/config';
import { Command, Option } from "commander";
import GroqInstance from './util/GroqInstance.js';
import prompt from './util/Prompt.js';
import processFileWithProvider from './util/processFileWithProvider.js';

const packageJSON = JSON.parse(fs.readFileSync('./package.json'));
const program = new Command();


program
  .version(packageJSON.version, '-v, --version', 'output the current version')
  .description('CLI tool to process a file output the code blocks with comments')

program
  .addOption(new Option('-a, --api-key [your-key]', 'define API key to use for processing defined in .env file').env('API_KEY').makeOptionMandatory())
  .addOption(new Option('-b, --baseURL [url]', 'define the base URL to use for processing defined in .env file').default('https://api.groq.com/').env('BASE_URL'))
  .addOption(new Option('-m, --model [model-name]',  'define the model to use for processing').default('llama-3.1-70b-versatile').env('MODEL_NAME'))
  .addOption(new Option('-o, --output [file.type]', 'define an output file').default('explainer_output.txt'))
  .addOption(new Option('-t, --temperature [number]', 'define temperature of chat completion between 0 to 2').default(1))
  


  
program.argument('<file>', 'file to process')
  .action(async (file, options) => {
    try {
      if (fs.existsSync(file)) {
        const GROQ = GroqInstance(options.apiKey, options.baseURL);
        const validPrompt = prompt(fs.readFileSync(file, 'utf8'));
        const response = await processFileWithProvider(GROQ,
                                                       validPrompt,
                                                       options.model,
                                                       options.temperature);

        if(response.choices[0].message.content){
          console.log(response.choices[0].message.content)
        }
        else{
          console.log('No explanation returned by provider.');
        }
      }
      else{
        console.error(`File ${file} not found!`)
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

program.showHelpAfterError()
program.parse(process.argv);