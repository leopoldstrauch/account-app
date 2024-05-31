import { Member } from "./Member";

export type MemberInput = Omit<Member, 'id'>;