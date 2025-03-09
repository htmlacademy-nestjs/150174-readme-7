import { ImagePost } from '@avylando-readme/core';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateImagePostDto
  extends CreateBasePostDto
  implements Omit<ImagePost, 'id'>
{
  public imageSrc: ImagePost['imageSrc'];
  public kind: ImagePost['kind'];
}
