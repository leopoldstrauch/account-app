import {IEventRepository} from "@/core/interfaces/IEventRepository";
import {v4 as uuidv4} from "uuid";
import {CreateMemberCommand} from "@/core/usecases/member/MemberCommands";
import {MemberCreatedEvent} from "@/core/usecases/member/MemberEvents";

export class CreateMemberHandler {
    constructor(private eventRepository: IEventRepository) {
    }

    async run(command: CreateMemberCommand): Promise<void> {
        const event = new MemberCreatedEvent(0, uuidv4(), {
            name: command.name,
            firstName: command.firstName,
            birthdate: command.birthdate,
            membershipStartDate: command.membershipStartDate,
            membershipEndDate: command.membershipEndDate,
            phoneNumber: command.phoneNumber,
            mobileNumber: command.mobileNumber,
            email: command.email,
            postalCode: command.postalCode,
            city: command.city,
            street: command.street,
            addressAddition: command.addressAddition,
        });
        await this.eventRepository.createEvent(event);
    }
}