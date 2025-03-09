import { VideoPost } from '@avylando-readme/core';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateVideoPostDto
  extends CreateBasePostDto
  implements Omit<VideoPost, 'id'>
{
  public videoSrc: VideoPost['videoSrc'];
  public name: VideoPost['name'];
  public kind: VideoPost['kind'];
}
