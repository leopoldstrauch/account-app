import {MemberReadmodel} from "@/core/types/MemberReadmodel";

export interface IMemberRepository {
    internal_save(meber: MemberReadmodel): Promise<void>;

    get(id: string): Promise<MemberReadmodel | null>;

    internal_delete(id: string): Promise<void>;

    getAll(): Promise<MemberReadmodel[]>;
}