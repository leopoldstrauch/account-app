-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "membershipStartDate" TIMESTAMP(3) NOT NULL,
    "membershipEndDate" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "mobileNumber" TEXT,
    "email" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "addressAddition" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
