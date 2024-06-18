// src/core/interfaces/IEventRepository.ts

import { Event } from "@/core/types/Event";

export interface IEventRepository {
    createEvent(event: Event): Promise<void>;
    getEventsByEntityId(entityId: string): Promise<Event[]>;
}
