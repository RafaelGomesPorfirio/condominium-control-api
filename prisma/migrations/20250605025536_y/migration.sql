-- DropForeignKey
ALTER TABLE `unidade` DROP FOREIGN KEY `unidade_condominioId_fkey`;

-- AddForeignKey
ALTER TABLE `unidade` ADD CONSTRAINT `unidade_condominioId_fkey` FOREIGN KEY (`condominioId`) REFERENCES `condominio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
