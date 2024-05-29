import { Member, MemberInput } from '../types/Member';

export interface IMemberRepository {
  createMember(member: MemberInput): Promise<Member>;
  listMembers(): Promise<Member[]>;
  updateMember(id: number, member: MemberInput): Promise<Member>;
  deleteMember(id: number): Promise<void>;
}
