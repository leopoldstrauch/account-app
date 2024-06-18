import { PrismaClient, Event as PrismaEvent } from '@prisma/client';
import { IEventRepository } from '@/core/interfaces/IEventRepository';
import { Event } from '@/core/types/Event';
import { EventType } from '@/core/types/EventTypes';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class PrismaEventRepository implements IEventRepository {
    async createEvent(event: Event): Promise<void> {
        await prisma.event.create({
            data: {
                id: uuidv4(),
                sequence: event.sequence,
                type: event.type,
                timestamp: new Date(event.timestamp),
                entityId: event.entityId,
                data: event.data,
            },
        });
    }

    async getAllEntityIds(): Promise<string[]> {
        const entityIds = await prisma.event.findMany({
            distinct: ['entityId'],
            select: { entityId: true },
        });
        return entityIds.map(event => event.entityId);
    }

    async getLastEventOfType(entityId: string, eventType: EventType): Promise<Event | null> {
        const lastEvent = await prisma.event.findFirst({
            where: { entityId, type: eventType },
            orderBy: { sequence: 'desc' },
        });

        if (!lastEvent) return null;

        return {
            id: lastEvent.id,
            sequence: lastEvent.sequence,
            type: lastEvent.type,
            timestamp: lastEvent.timestamp,
            entityId: lastEvent.entityId,
            data: lastEvent.data,
        };
    }

    async getEventsByTypesAfterSequence(
        entityId: string,
        eventTypes: EventType[],
        afterSequence: number
    ): Promise<Event[]> {
        const events = await prisma.event.findMany({
            where: {
                entityId,
                type: { in: eventTypes },
                sequence: { gt: afterSequence },
            },
            orderBy: { sequence: 'asc' },
        });

        return events.map(event => ({
            id: event.id,
            sequence: event.sequence,
            type: event.type,
            timestamp: event.timestamp,
            entityId: event.entityId,
            data: event.data,
        }));
    }
}
