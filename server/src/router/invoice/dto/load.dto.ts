import { ApiProperty } from '@nestjs/swagger';

export class LoadPDF {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Arquivo para upload',
  })
  file: string;
}

export class LoadMultiplePDF {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Arquivos para upload',
  })
  files: Array<string>;
}
