// src/core/repositories/EventRepository.ts

import {IEventRepository} from "@/core/interfaces/IEventRepository";
import {PrismaClient} from "@prisma/client";
import {TEvent} from "@/core/types/Event";

export class EventRepository implements IEventRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createEvent(event: TEvent): Promise<void> {
        await this.prisma.event.create({
            data: {
                id: event.id,
                sequence: event.sequence,
                type: event.type,
                timestamp: event.timestamp,
                entityId: event.entityId,
                data: event.data,
            },
        });
    }

    async getEventsByEntityId(entityId: string): Promise<Event[]> {
        const events = await this.prisma.event.findMany({
            where: {entityId},
            orderBy: {sequence: 'asc'},
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
