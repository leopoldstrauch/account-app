// src/core/usecases/entries/EntryEvents.ts

import { TEvent } from "@/core/types/Event";
import { v4 as uuidv4 } from "uuid";
import { EventType } from "@/core/types/EventType";

export class EntryCreatedEvent extends TEvent {
    constructor(sequence: number, entityId: string, data: { debitAccountId: string; creditAccountId: string; amount: number; description?: string }) {
        super(uuidv4(), sequence, EventType.EntryCreated, new Date(), entityId, data);
    }
}
