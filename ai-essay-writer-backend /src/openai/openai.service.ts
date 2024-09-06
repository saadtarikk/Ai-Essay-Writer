import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = new OpenAI({ apiKey });
  }

  async generateEssay(prompt: string): Promise<string> {
    console.log('Generating essay for prompt:', prompt);
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that writes essays." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1000,
      });
      console.log('OpenAI response:', response);
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating essay with OpenAI:', error);
      throw error;
    }
  }

  async generateCitation(source: string, style: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a citation generator. Generate a citation in ${style} style.` },
        { role: "user", content: `Generate a citation for: ${source}` }
      ],
    });
    return response.choices[0].message.content;
  }

  async autocomplete(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI writing assistant." },
        { role: "user", content: prompt }
      ],
    });
    return response.choices[0].message.content;
  }

  async generateFromFile(fileContent: string, prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI that generates content based on provided research." },
        { role: "user", content: `Based on the following research: ${fileContent}\n\nGenerate: ${prompt}` }
      ],
    });
    return response.choices[0].message.content;
  }
}