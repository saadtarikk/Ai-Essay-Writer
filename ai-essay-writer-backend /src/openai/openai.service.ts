import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    console.log('OpenAI API Key:', apiKey ? 'Loaded' : 'Not found');
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateEssay(topic: string): Promise<string> {
    console.log('Generating essay for topic:', topic);
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that writes essays." },
          { role: "user", content: `Write an essay about ${topic}` }
        ],
        max_tokens: 1000,
      });
      console.log('OpenAI response:', response);
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating essay with OpenAI:', error);
      throw error;
    }
  }}