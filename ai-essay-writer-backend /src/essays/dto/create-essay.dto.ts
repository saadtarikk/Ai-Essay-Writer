import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEssayDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  topic: string;
}