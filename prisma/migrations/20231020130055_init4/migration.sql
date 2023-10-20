-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "usersId" INTEGER;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
