import 'multer';

const fileToFormData = (file: Express.Multer.File): FormData => {
  const formData = new FormData();
  formData.append(
    'file',
    new Blob([file.buffer], { type: file.mimetype }),
    file.originalname
  );
  return formData;
};

export { fileToFormData };
