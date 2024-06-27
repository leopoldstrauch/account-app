import {IMemberRepository} from "@/core/interfaces/IMemberRepository";
import {MemberReadmodel} from "@/core/types/MemberReadmodel";

export class MemberRepository implements IMemberRepository {
    internal_save(meber: MemberReadmodel): Promise<void> {
        throw new Error("Method not implemented.");
    }

    get(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    internal_delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<MemberReadmodel[]> {
        throw new Error("Method not implemented.");
    }

}