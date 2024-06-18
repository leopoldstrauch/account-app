// src/core/usecases/accounts/AccountEvents.ts

import {TEvent} from "@/core/types/Event";
import {v4 as uuidv4} from "uuid";
import {EventType} from "@/core/types/EventType";
import {AccountType} from "@/core/types/AccountType";

export class AccountCreatedEvent extends TEvent {
    constructor(sequence: number, entityId: string, data: { name: string; type: AccountType }) {
        super(uuidv4(), sequence, EventType.AccountCreated, new Date(), entityId, data);
    }
}

export class AccountDeletedEvent extends TEvent {
    constructor(sequence: number, entityId: string) {
        super(uuidv4(), sequence, EventType.AccountDeleted, new Date(), entityId, null);
    }
}

export class AccountNameUpdatedEvent extends TEvent {
    constructor(sequence: number, entityId: string, data: { newName: string }) {
        super(uuidv4(), sequence, EventType.AccountNameUpdated, new Date(), entityId, data);
    }
}
