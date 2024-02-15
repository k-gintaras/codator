import OpenAI from 'openai';
// import getEnvVariable from '../helpers/dotEnvHelper';
import { assistantFastCoding } from './assistants/coding-general';
import { MessageContentText } from 'openai/resources/beta/threads/messages/messages.mjs';
// const apiKey = getEnvVariable('OPENAI_API_KEY');

// const configuration = {
//   apiKey: apiKey,
// };

// const openai = new OpenAI(configuration);
class GptService {
  private apiKey: string;
  private openai: OpenAI;
  private thread: any;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.openai = new OpenAI({
      apiKey: this.apiKey,
    });
  }

  async getFastGptCode(msg: string): Promise<string> {
    if (!this.openai) {
      throw new Error(`Use constructor and pass api key please.   
      const gptService = new GptService(apiKey);
      const response = await gptService.getFastGptCode(msg);`);
    }

    try {
      if (!this.thread) {
        this.thread = await this.openai.beta.threads.create({});
      }

      await this.openai.beta.threads.messages.create(this.thread.id, {
        role: 'user',
        content: msg,
      });

      const run = await this.openai.beta.threads.runs.create(this.thread.id, {
        assistant_id: 'asst_51x0kYdnXcdkjOE3S4VpzIPL',
      });

      const threadId = this.thread.id;

      let completedRun;
      do {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
        completedRun = await this.openai.beta.threads.runs.retrieve(threadId, run.id);
      } while (completedRun.status !== 'completed');

      const messages = await this.openai.beta.threads.messages.list(threadId);
      const assistantMessages: OpenAI.Beta.Threads.Messages.ThreadMessage[] = messages.data.filter((m) => m.role === 'assistant');

      const latestAssistantMessage: (OpenAI.Beta.Threads.Messages.MessageContentImageFile | OpenAI.Beta.Threads.Messages.MessageContentText)[] | undefined = assistantMessages.pop()?.content;

      if (!latestAssistantMessage) {
        throw new Error("No text content found in the assistant's response.");
      }

      const textContents: OpenAI.Beta.Threads.Messages.MessageContentText[] = latestAssistantMessage.filter((contentItem): contentItem is MessageContentText => contentItem.type === 'text');

      if (textContents.length === 0) {
        throw new Error("No text content found in the assistant's response.");
      }
      let responseText = textContents.map((content) => '// ' + content.text.value).join('\n');

      return responseText;
    } catch (error) {
      console.error('Failed to get GPT code:', error);
      throw new Error('Error communicating with GPT API');
    }
  }

  getTestResponse(msg: string): Promise<string> {
    // Create and return a promise that resolves with a GptResponse
    return new Promise((resolve) => {
      // Resolve the promise with the response
      resolve(msg);
    });
  }

  // cannot handle `${...}`
  formatGptResponse(input: string): string {
    let inCodeBlock = false;
    let result = '';
    let codeSegment = '';
    let commentSegment = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      // Toggle the inCodeBlock flag and process segments when encountering a backquote
      if (char === '`') {
        inCodeBlock = !inCodeBlock;

        // If exiting a code block, add the code segment as is and reset it
        if (!inCodeBlock) {
          result += codeSegment;
          codeSegment = '';
        } else {
          // If entering a code block from text, add the text as a comment (if it's not empty)
          if (commentSegment.trim().length > 0) {
            // Ensure each line in the comment segment is prefixed with "// "
            const commentedLines = commentSegment
              .split('\n')
              .map((line) => (line.trim().length > 0 ? `// ${line}` : line))
              .join('\n');
            result += `${commentedLines}\n`;
            commentSegment = '';
          }
        }
        continue;
      }

      // Append the current character to the appropriate segment based on the current state
      if (inCodeBlock) {
        codeSegment += char;
      } else {
        commentSegment += char;
      }
    }

    // Handle any remaining text outside of backquotes as a comment
    if (commentSegment.trim().length > 0) {
      const commentedLines = commentSegment
        .split('\n')
        .map((line) => (line.trim().length > 0 ? `// ${line}` : line))
        .join('\n');
      result += `${commentedLines}\n`;
    }

    // If the input ends while still in a code block, append what's left of the code segment
    if (inCodeBlock && codeSegment.trim().length > 0) {
      result += `${codeSegment}\n`;
    }

    return result;
  }
}

export default GptService;
// export async function getFastGptCode(msg: string) {
//   const assistant = await openai.beta.assistants.create(assistantFastCoding);
//   const thread = await openai.beta.threads.create();
//   const message = await openai.beta.threads.messages.create(thread.id, {
//     role: 'user',
//     content: msg,
//   });

//   // Now if you list the Messages in a Thread, you will see that this message has been appended.

//   const run = await openai.beta.threads.runs.create(thread.id, {
//     assistant_id: assistant.id,
//   });

//   // Once the Run completes, you can list the Messages added to the Thread by the Assistant.
//   const messages = await openai.beta.threads.messages.list(thread.id);

//   // maybe new thread every hour or something, not like i will ever remember an old thread anyway myself
//   // or maybe have it in settings... ?
// }

// export async function getAdvancedCompletionFullResponse(msg: string, isCreative: boolean) {
//   let creativity = 0.5;
//   if (isCreative) creativity = 1.5;
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     max_tokens: 1500,
//     temperature: creativity,
//     messages: [
//       {
//         role: 'user',
//         content: msg,
//       },
//     ],
//   });

//   return response;
// }

// export async function getSimpleCompletionFullResponse(msg: string, isCreative: boolean) {
//   let creativity = 0.5;
//   if (isCreative) creativity = 1.5;
//   const model = 'text-davinci-003';

//   const response = await openai.createCompletion({
//     model: model,
//     prompt: msg,
//     max_tokens: 1500,
//     temperature: creativity,
//   });

//   return response;
// }
