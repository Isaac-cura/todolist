import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionDictionary } from '../../models/subscription.models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionManagerService {
  private dictionary: SubscriptionDictionary = {};

  constructor() { }

  addSubscription(key: string, subscription: Subscription) {
    const oldSubscription = this.dictionary[key];
    oldSubscription && oldSubscription.unsubscribe();
    this.dictionary[key] = subscription;
  }

}
