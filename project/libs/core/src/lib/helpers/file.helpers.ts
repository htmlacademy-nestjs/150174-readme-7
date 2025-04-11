import 'multer';

const transformFileBuffer = (
  file: Express.Multer.File
): Express.Multer.File => {
  const buffer = Buffer.from(file.buffer);
  return {
    ...file,
    // @ts-ignore
    buffer: { ...file.buffer, data: Buffer.from(file.buffer.data) },
  };
};

export { transformFileBuffer };
