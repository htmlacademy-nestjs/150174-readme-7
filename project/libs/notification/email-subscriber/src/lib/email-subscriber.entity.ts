import {
  Entity,
  NotificationSubscriber,
  StorableEntity,
} from '@avylando-readme/core';

class EmailSubscriberEntity
  extends Entity
  implements StorableEntity<NotificationSubscriber>
{
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(subcsriber: NotificationSubscriber) {
    super(subcsriber);
    this.populate(subcsriber);
  }

  private populate(subscriber: NotificationSubscriber): void {
    this.email = subscriber.email;
    this.firstName = subscriber.firstName;
    this.lastName = subscriber.lastName;
  }

  toPlainObject(): NotificationSubscriber {
    return {
      ...this,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}

export { EmailSubscriberEntity };
