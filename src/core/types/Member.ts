export interface MemberInput {
    name: string;
    firstName: string;
    birthdate: Date;
    membershipStartDate: Date;
    membershipEndDate?: Date | null;
    phoneNumber?: string | null;
    mobileNumber?: string | null;
    email: string;
    postalCode: string;
    city: string;
    street: string;
    addressAddition?: string | null;
  }
  
  export interface Member extends MemberInput {
    id: number;
  }
  