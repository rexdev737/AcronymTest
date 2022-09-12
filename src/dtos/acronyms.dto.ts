import { IsString } from 'class-validator';

export class CreateAcronymDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;
}
