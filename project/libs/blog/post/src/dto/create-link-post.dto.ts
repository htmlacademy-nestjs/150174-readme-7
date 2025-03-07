import { LinkPost } from '@avylando-readme/core';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateLinkPostDto
  extends CreateBasePostDto
  implements Omit<LinkPost, 'id'>
{
  public link: LinkPost['link'];
  public description: LinkPost['description'];
  public kind: LinkPost['kind'];
}
