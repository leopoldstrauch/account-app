// src/core/interfaces/IEventRepository.ts

import {TEvent} from "@/core/types/Event";

export interface IEventRepository {
    createEvent(event: TEvent): Promise<void>;

    getEventsByEntityId(entityId: string): Promise<Event[]>;
}
