import {EventType} from "@/core/types/EventType";

export class TEvent {
    id: string;
    sequence: number;
    type: EventType;
    timestamp: Date;
    entityId: string;
    data: any;

    constructor(id: string, sequence: number, type: EventType, timestamp: Date, entityId: string, data: any) {
        this.id = id;
        this.sequence = sequence;
        this.type = type;
        this.timestamp = timestamp;
        this.entityId = entityId;
        this.data = data;
    }
}