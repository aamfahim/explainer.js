export const Prompt = (content) => {
    if (content === undefined){
        throw new Error('content is required');
    }
    return `Explain each code block in the following file by adding comments: \n\n${content}\n\n`;
} 