import { BaseEntity, BasePost } from '@avylando-readme/core';
import {
  BasePostConstraints,
  ImagePostConstraints,
  LinkPostConstraints,
  QuotePostConstraints,
  TextPostConstraints,
  VideoPostConstraints,
} from './dto-validations.types';

const BasePostValidation: BasePostConstraints = {
  status: {
    validType: {
      message: 'Post status should be a valid string',
    },
    enum: {
      values: ['published', 'draft'],
      message: 'Post status should be one of published or draft',
    },
  },
  kind: {
    validType: {
      message: 'Post kind should be a valid string',
    },
    enum: {
      values: ['text', 'video', 'image', 'link', 'quote'],
      message: 'Post kind should be one of text, video, image, link, or quote',
    },
  },
  authorId: {
    validType: {
      message: 'Author ID should be a valid MongoID',
    },
  },
  tags: {
    validType: {
      message: 'Invalid tags',
    },
    length: {
      min: 3,
      max: 10,
      message: 'Tag length should be between 3 and 10',
    },
    size: {
      min: 0,
      max: 8,
      message: 'Tags array should have between 8 items maximum',
    },
  },
};

const VideoPostValidation: VideoPostConstraints = {
  title: {
    validType: {
      message: 'Title must be a valid string',
    },
    length: {
      min: 20,
      max: 50,
      message: 'Title length should be between 20 and 50 characters',
    },
  },
  videoSrc: {
    validType: {
      message: 'Video should be a valid URL',
    },
  },
};

const ImagePostValidation: ImagePostConstraints = {
  imageSrc: {
    validType: {
      message: 'Image should be a valid URL',
    },
    urlOptions: {
      require_tld: false,
      require_valid_protocol: false,
      require_host: false,
    },
  },
};

const TextPostValidation: TextPostConstraints = {
  content: {
    validType: {
      message: 'Content must be a valid string',
    },
    length: {
      min: 100,
      max: 1024,
      message: 'Content length should be between 100 and 1024 characters',
    },
  },
  title: {
    validType: {
      message: 'Title must be a valid string',
    },
    length: {
      min: 20,
      max: 50,
      message: 'Title length should be between 20 and 50 characters',
    },
  },
  preview: {
    validType: {
      message: 'Preview must be a valid string',
    },
    length: {
      min: 50,
      max: 255,
      message: 'Preview length should be between 50 and 255 characters',
    },
  },
};

const LinkPostValidation: LinkPostConstraints = {
  link: {
    validType: {
      message: 'Link should be a valid URL',
    },
  },
  description: {
    validType: {
      message: 'Description should be a string',
    },
    length: {
      min: 0,
      max: 300,
      message: 'Description length should be up to 300 characters',
    },
  },
};

const QuotePostValidation: QuotePostConstraints = {
  quote: {
    validType: {
      message: 'Quote must be a valid string',
    },
    length: {
      min: 20,
      max: 300,
      message: 'Quote length should be between 20 and 300 characters',
    },
  },
  authorName: {
    validType: {
      message: 'Quote author name must be a valid string',
    },
    length: {
      min: 3,
      max: 50,
      message: 'Quote author length should be between 3 and 50 characters',
    },
  },
};

const LikePostValidationMessage = {
  userId: 'Invalid user id',
};

export {
  BasePostValidation,
  LikePostValidationMessage,
  VideoPostValidation,
  ImagePostValidation,
  TextPostValidation,
  LinkPostValidation,
  QuotePostValidation,
};
