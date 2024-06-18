import { Event } from '../types/Event';
import { EventType } from "@/core/types/EventType";

export interface IEventRepository {
    createEvent(event: Event): Promise<Event>;

    getAllEntityIds(): Promise<string[]>;

    getLastEventOfType(entityId: string, eventType: EventType): Promise<Event | null>;

    getEventsByTypesAfterSequence(
        entityId: string,
        eventTypes: EventType[],
        afterSequence: number
    ): Promise<Event[]>;
}
