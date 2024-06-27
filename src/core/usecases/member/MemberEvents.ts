import {TEvent} from "@/core/types/Event";
import {v4 as uuidv4} from "uuid";
import {EventType} from "@/core/types/EventType";

export class MemberCreatedEvent extends TEvent {
    constructor(sequence: number, entityId: string, data: {
        name: string,
        firstName: string,
        birthdate: Date,
        membershipStartDate: Date,
        membershipEndDate: Date,
        phoneNumber: string,
        mobileNumber: string,
        email: string,
        postalCode: string,
        city: string,
        street: string,
        addressAddition: string
    }) {
        super(uuidv4(), sequence, EventType.AccountCreated, new Date(), entityId, data);
    }
}
