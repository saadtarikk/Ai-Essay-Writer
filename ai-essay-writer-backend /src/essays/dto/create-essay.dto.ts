import { IsString, IsNotEmpty } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  paperType: string;

  @IsString()
  @IsNotEmpty()
  subjectArea: string;
}