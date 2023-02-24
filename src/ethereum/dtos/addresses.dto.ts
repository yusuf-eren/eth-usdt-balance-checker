import { ArrayNotEmpty, IsString, IsOptional } from 'class-validator';

export class AddressesDto {
  @ArrayNotEmpty()
  @IsString({
    each: true,
  })
  validAddresses: string[];

  @IsOptional()
  invalidAddresses: any[];
}
