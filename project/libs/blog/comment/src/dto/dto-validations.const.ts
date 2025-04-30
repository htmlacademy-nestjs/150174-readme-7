import { CommentConstraints } from './dto-validations.type';

export const CommentValidation: CommentConstraints = {
  authorId: {
    validType: {
      message: 'Author ID must be a MongoID',
    },
  },
  content: {
    validType: {
      message: 'Content must be a string',
    },
    length: {
      message: 'Content must be between 10 and 300 characters',
      min: 10,
      max: 300,
    },
  },
};
