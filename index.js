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
  .addOption(new Option('-a, --api-key [your-key]', 'define API key to use for processing').env('API_KEY'))
  .addOption(new Option('-b, --baseURL [url]', 'define the base URL to use for processing').default('https://api.groq.com/').env('BASE_URL'))
  .addOption(new Option('-m, --model [model-name]',  'define the model to use for processing').default('llama-3.1-70b-versatile').env('MODEL_NAME'))
  .addOption(new Option('-o, --output [file.type]', 'define an output file').default('explainer_output.txt'))
  .addOption(new Option('-t, --temperature', 'define temperature of chat completion between 0 to 2').default(1))
  


  
program.argument('<file>', 'file to process')
  .action(async (file) => {
    try {
      // check file validity
      if (!fs.existsSync(file)) {
        console.error(`File ${file} not found!`);
        process.exit(1);
      }
      if (true){
        // instantiate the groq sdk
        const GROQ = GroqInst(program.opts().apiKey, program.opts().baseURL);
        // create a prompt
        const validPrompt = prompt(fs.readFileSync(file, 'utf8'));
        // process
        const response = await processFileWithProvider(GROQ, validPrompt, program.opts().model, program.opts().temperature);
        // check response
        response.choices[0].message.content ? console.log(response.choices[0].message.content) : console.log('No explanation returned by provider.');
        // output
        // const processedContent = await processFileWithGroq(fileContent);

      }

      // console.log(processedContent);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

async function processFileWithGroq(content) {
  try {
    const prompt = `Explain each code block in the following file by adding comments: \n\n${content}\n\n`;

    const response = await new Groq({apiKey: process.env.API_KEY, baseURL:'https://api.groq.com/'}).chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 1,
    });

    if (response.choices[0].message.content) {
      return response.choices[0].message.content;
    }

    return 'No explanation returned by provider.';
  } catch (error) {
    throw new Error(`Provider processing failed: ${error.message}`);
  }
}


program.parse(process.argv);
program.showHelpAfterError()