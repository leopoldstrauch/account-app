export interface IMemberRepository {
    listMembers(): Promise<Member[]>;
}
