import { Command } from "commander";
import fs from 'fs';
import Groq from "groq-sdk"
const program = new Command();
import 'dotenv/config'
program
  .version('1.0.0')
  .description('CLI tool to process a file, pass it to Ollama, and output the code blocks with comments')
  .argument('<file>', 'file to process')
  .action(async (file) => {
    try {
      if (!fs.existsSync(file)) {
        console.error(`File ${file} not found!`);
        process.exit(1);
      }

      const fileContent = fs.readFileSync(file, 'utf8');
      const processedContent = await processFileWithGroq(fileContent);

      console.log(processedContent);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

async function processFileWithGroq(content) {
  try {
    const prompt = `Explain each code block in the following file by adding comments: \n\n${content}\n\n`;

    const response = await new Groq({apiKey: process.env.GROQ_API_KEY}).chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-70b-versatile",
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
