import { MongoRepository } from '@avylando-readme/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberModel } from './email-subscriber.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailSubscriberFactory } from './email-subscriber.factory';

@Injectable()
class EmailSubscriberRepository extends MongoRepository<
  EmailSubscriberEntity,
  EmailSubscriberModel
> {
  constructor(
    entityFactory: EmailSubscriberFactory,
    @InjectModel(EmailSubscriberModel.name)
    emailSubscriberModel: Model<EmailSubscriberModel>
  ) {
    super(entityFactory, emailSubscriberModel);
  }

  async findByEmail(email: string): Promise<EmailSubscriberEntity | null> {
    const subscriber = await this.model.findOne({ email }).exec();

    return subscriber ? new EmailSubscriberEntity(subscriber) : null;
  }
}

export { EmailSubscriberRepository };
