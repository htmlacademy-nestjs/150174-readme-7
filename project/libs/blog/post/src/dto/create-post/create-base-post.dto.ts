import { BasePost } from '@avylando-readme/core';

export class CreateBasePostDto implements Omit<BasePost, 'id'> {
  public authorId: string;
  public status: BasePost['status'];
  public tags?: BasePost['tags'];
}
