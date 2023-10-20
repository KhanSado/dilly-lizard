-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_usersId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "usersId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
