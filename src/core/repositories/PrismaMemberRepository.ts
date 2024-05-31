import { PrismaClient, Member as PrismaMember } from '@prisma/client';
import { IMemberRepository } from '../interfaces/IMemberRepository';
import { Member } from '../types/Member';
import { MemberInput } from '../types/MemberInput';
import prisma from '@/lib/prisma';

export class PrismaMemberRepository implements IMemberRepository {
  async createMember(member: MemberInput): Promise<Member> {
    const createdMember: PrismaMember = await prisma.member.create({
      data: {
        ...member,
        birthdate: new Date(member.birthdate),
        membershipStartDate: new Date(member.membershipStartDate),
        membershipEndDate: member.membershipEndDate ? new Date(member.membershipEndDate) : null,
      },
    });

    return this.toDomain(createdMember);
  }

  async listMembers(): Promise<Member[]> {
    const members: PrismaMember[] = await prisma.member.findMany();
    return members.map(this.toDomain);
  }

  async updateMember(id: number, member: MemberInput): Promise<Member> {
    const updatedMember: PrismaMember = await prisma.member.update({
      where: { id },
      data: {
        ...member,
        birthdate: new Date(member.birthdate),
        membershipStartDate: new Date(member.membershipStartDate),
        membershipEndDate: member.membershipEndDate ? new Date(member.membershipEndDate) : null,
      },
    });

    return this.toDomain(updatedMember);
  }

  async deleteMember(id: number): Promise<void> {
    await prisma.member.delete({ where: { id } });
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
