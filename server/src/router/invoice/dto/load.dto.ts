import { ApiProperty } from '@nestjs/swagger';

export class LoadPDF {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Arquivo para upload',
  })
  file: any;
}
