import {TEvent} from "@/core/types/Event";
import {v4 as uuidv4} from "uuid";
import {EventType} from "@/core/types/EventType";
import {AccountType} from "@/core/types/AccountType";

export interface AccountCreatedEventData {
    name: string;
    type: AccountType;
}

export class AccountCreatedEvent extends TEvent {
    constructor(sequence: number, entityId: string, data: AccountCreatedEventData) {
        super(uuidv4(), sequence, EventType.AccountCreated, new Date(), entityId, data);
    }
}

export class AccountDeletedEvent extends TEvent {
    constructor(sequence: number, entityId: string, data: null) {
        super(uuidv4(), sequence, EventType.AccountDeleted, new Date(), entityId, data);
    }
}

export interface AccountNameUpdatedEventData {
    newName: string;
}

export class AccountNameUpdatedEvent extends TEvent {
    constructor(sequence: number, entityId: string, data: AccountNameUpdatedEventData) {
        super(uuidv4(), sequence, EventType.AccountNameUpdated, new Date(), entityId, data);
    }
}
