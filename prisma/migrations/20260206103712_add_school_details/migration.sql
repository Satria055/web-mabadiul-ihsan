-- AlterTable
ALTER TABLE `EducationUnit` ADD COLUMN `accreditation` VARCHAR(191) NULL,
    ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `district` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `facebookUrl` VARCHAR(191) NULL,
    ADD COLUMN `instagramUrl` VARCHAR(191) NULL,
    ADD COLUMN `npsn` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `province` VARCHAR(191) NULL,
    ADD COLUMN `regency` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL,
    ADD COLUMN `tiktokUrl` VARCHAR(191) NULL,
    ADD COLUMN `twitterUrl` VARCHAR(191) NULL,
    ADD COLUMN `village` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `EducationGallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NULL,
    `unitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EducationGallery` ADD CONSTRAINT `EducationGallery_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `EducationUnit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
