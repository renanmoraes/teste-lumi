import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

export const PDFFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.includes('pdf')) {
    return callback(
      new BadRequestException('Only PDF files are allowed!'),
      false,
    );
  }
  callback(null, true);
};
