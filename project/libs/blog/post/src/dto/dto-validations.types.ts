import {
  ArrayValidation,
  EnumValidation,
  StringValidation,
  UrlValidation,
} from '@avylando-readme/core';

type BasePostConstraints = {
  status: EnumValidation;
  authorId: StringValidation<'validType'>;
  kind: EnumValidation;
  tags: StringValidation<'validType' | 'length'> & ArrayValidation<'size'>;
};

type VideoPostConstraints = {
  title: StringValidation<'validType' | 'length'>;
  videoSrc: UrlValidation;
};

type ImagePostConstraints = {
  imageSrc: UrlValidation;
};

type TextPostConstraints = {
  content: StringValidation<'validType' | 'length'>;
  title: StringValidation<'validType' | 'length'>;
  preview: StringValidation<'validType' | 'length'>;
};

type LinkPostConstraints = {
  link: UrlValidation;
  description: StringValidation<'validType' | 'length'>;
};

type QuotePostConstraints = {
  quote: StringValidation<'validType' | 'length'>;
  authorName: StringValidation<'validType' | 'length'>;
};

type PostConstraints = {
  video: VideoPostConstraints;
  image: ImagePostConstraints;
  text: TextPostConstraints;
  link: LinkPostConstraints;
  quote: QuotePostConstraints;
};

export type {
  BasePostConstraints,
  VideoPostConstraints,
  ImagePostConstraints,
  TextPostConstraints,
  LinkPostConstraints,
  QuotePostConstraints,
  PostConstraints,
};
