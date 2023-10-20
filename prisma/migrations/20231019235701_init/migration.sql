-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(75) NOT NULL,
    "subtitle" VARCHAR(75),
    "sumary" VARCHAR(150) NOT NULL,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
