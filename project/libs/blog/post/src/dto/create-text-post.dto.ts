import { TextPost } from '@avylando-readme/core';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateTextPostDto
  extends CreateBasePostDto
  implements Omit<TextPost, 'id'>
{
  public name: TextPost['name'];
  public content: TextPost['content'];
  public kind: TextPost['kind'];
  public preview: TextPost['preview'];
}
