  export interface Member {
    id: number;
    name: string;
    firstName: string;
    birthdate: Date;
    membershipStartDate: Date;
    membershipEndDate: Date | null;
    phoneNumber: string | null;
    mobileNumber: string | null;
    email: string;
    postalCode: string;
    city: string;
    street: string;
    addressAddition: string | null;
  }
  