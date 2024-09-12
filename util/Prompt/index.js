import ArgsChecker from "../ArgsChecker";

const Prompt = (content) => {
    if (!ArgsChecker(arguments, 1)) {
        throw new Error(`${arguments.toString()} missing or values are not defined properly`);
    }

    return `Explain each code block in the following file by adding comments: \n\n${content}\n\n`;
} 

export default Prompt;