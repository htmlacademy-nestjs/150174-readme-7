import { Injectable, Logger } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberFactory } from './email-subscriber.factory';

@Injectable()
class EmailSubscriberService {
  private readonly logger = new Logger(EmailSubscriberService.name);

  constructor(
    private readonly factory: EmailSubscriberFactory,
    private readonly repository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(
    dto: CreateEmailSubscriberDto
  ): Promise<EmailSubscriberEntity> {
    const subscriber = await this.repository.findByEmail(dto.email);

    if (subscriber) {
      this.logger.warn(`Subscriber with email ${dto.email} already exists.`);
      return subscriber;
    }

    const newSubscriber = this.factory.create(dto);
    const createdSubscriber = await this.repository.save(newSubscriber);

    this.logger.log(`Subscriber with email ${dto.email} created.`);
    return createdSubscriber;
  }
}

export { EmailSubscriberService };
