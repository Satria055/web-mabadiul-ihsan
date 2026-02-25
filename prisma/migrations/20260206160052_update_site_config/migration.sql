-- AlterTable
ALTER TABLE `SiteConfig` ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `facebook` VARCHAR(191) NULL,
    ADD COLUMN `instagram` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `registrationUrl` VARCHAR(191) NULL DEFAULT '/pendaftaran',
    ADD COLUMN `siteName` VARCHAR(191) NOT NULL DEFAULT 'Mabadi''ul Ihsan',
    ADD COLUMN `youtube` VARCHAR(191) NULL;
