import {Member as PrismaMember, Member} from '@prisma/client';
import {IMemberRepository} from '../interfaces/IMemberRepository';
import prisma from '@/lib/prisma';

export class PrismaMemberRepository implements IMemberRepository {

    async listMembers(): Promise<Member[]> {
        const members: PrismaMember[] = await prisma.member.findMany();
        return members.map(this.toDomain);
    }

    private toDomain(prismaMember: PrismaMember): Member {
        return {
            id: prismaMember.id,
            name: prismaMember.name,
            firstName: prismaMember.firstName,
            birthdate: prismaMember.birthdate,
            membershipStartDate: prismaMember.membershipStartDate,
            membershipEndDate: prismaMember.membershipEndDate,
            phoneNumber: prismaMember.phoneNumber ?? null,
            mobileNumber: prismaMember.mobileNumber ?? null,
            email: prismaMember.email,
            postalCode: prismaMember.postalCode,
            city: prismaMember.city,
            street: prismaMember.street,
            addressAddition: prismaMember.addressAddition ?? null,
        };
    }
}
