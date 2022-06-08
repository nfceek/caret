/*
  Warnings:

  - Made the column `userid` on table `carrots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `business` on table `carrots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `premium` on table `carrots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `banned` on table `carrots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `carrots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cid` on table `carrots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `privkey` on table `carrots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updateinfo` on table `carrots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `benefits` on table `plans` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fkwallet` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `chain` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `account` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateupdated` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `carrots` MODIFY `userid` INTEGER NOT NULL,
    MODIFY `word` VARCHAR(191) NOT NULL,
    ALTER COLUMN `available` DROP DEFAULT,
    MODIFY `business` BOOLEAN NOT NULL,
    MODIFY `premium` BOOLEAN NOT NULL,
    MODIFY `banned` BOOLEAN NOT NULL,
    MODIFY `price` INTEGER NOT NULL,
    MODIFY `cid` VARCHAR(191) NOT NULL,
    MODIFY `privkey` VARCHAR(191) NOT NULL,
    MODIFY `timestamp` VARCHAR(191) NOT NULL,
    MODIFY `updateinfo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `plans` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `type` VARCHAR(191) NOT NULL,
    MODIFY `benefits` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `fkwallet` INTEGER NOT NULL,
    MODIFY `firstname` VARCHAR(191) NOT NULL,
    MODIFY `lastname` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `plan` VARCHAR(191) NOT NULL,
    ALTER COLUMN `admin` DROP DEFAULT,
    ALTER COLUMN `level` DROP DEFAULT,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `chain` VARCHAR(191) NOT NULL,
    MODIFY `account` VARCHAR(191) NOT NULL,
    MODIFY `join_date` VARCHAR(191) NOT NULL,
    MODIFY `dateupdated` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wallet` MODIFY `chain` VARCHAR(191) NOT NULL,
    MODIFY `wallet` VARCHAR(191) NOT NULL;
