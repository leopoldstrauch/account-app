import {IEventRepository} from '../interfaces/IEventRepository';
import {TEvent} from '../types/Event';
import {EventType} from '../types/EventType';
import prisma from "@/lib/prisma";


export class PrismaEventRepository implements IEventRepository {
    async getEventsByEntityId(entityId: string): Promise<Event[]> {
        await prisma.event.findUnique({
            where: {
                id: entityId,
            },
        });
        throw new Error('Method not implemented.');
    }

    async createEvent(event: TEvent): Promise<void> {
        await prisma.event.create({
            data: {
                id: event.id,
                type: event.type,
                timestamp: event.timestamp,
                entityId: event.entityId,
                data: event.data,
            },
        });
    }

    async getAllDataIds(): Promise<string[]> {
        const dataIds = await prisma.event.findMany({
            distinct: ['entityId'],
            select: {
                entityId: true,
            },
        });
        return dataIds.map(e => e.entityId);
    }

    async getEventsForDataId(dataId: string, eventTypes: EventType[], fromEventType: EventType): Promise<TEvent[]> {
        const fromEvent = await prisma.event.findFirst({
            where: {
                entityId: dataId,
                type: fromEventType,
            },
            orderBy: {
                sequence: 'desc',
            },
        });

        if (!fromEvent) {
            throw new Error(`No event of type ${fromEventType} found for entity ${dataId}`);
        }

        const events = await prisma.event.findMany({
            where: {
                entityId: dataId,
                type: {
                    in: eventTypes,
                },
                sequence: {
                    gt: fromEvent.sequence,
                },
            },
            orderBy: {
                sequence: 'asc',
            },
        });

        return events.map(e => new TEvent(e.id, 0, e.type as EventType, e.timestamp, e.entityId, e.data));
    }
}
