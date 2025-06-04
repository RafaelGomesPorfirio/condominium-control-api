/*
  Warnings:

  - The primary key for the `condominio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `condominio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `movimentacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `movimentacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `visitanteId` on the `movimentacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `unidadeId` on the `movimentacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `unidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `unidade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `condominioId` on the `unidade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `visitante` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `visitante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `movimentacao` DROP FOREIGN KEY `Movimentacao_unidadeId_fkey`;

-- DropForeignKey
ALTER TABLE `movimentacao` DROP FOREIGN KEY `Movimentacao_visitanteId_fkey`;

-- DropForeignKey
ALTER TABLE `unidade` DROP FOREIGN KEY `Unidade_condominioId_fkey`;

-- AlterTable
ALTER TABLE `condominio` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `movimentacao` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `visitanteId` INTEGER NOT NULL,
    MODIFY `unidadeId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `unidade` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `condominioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `visitante` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_visitanteId_fkey` FOREIGN KEY (`visitanteId`) REFERENCES `visitante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidade` ADD CONSTRAINT `unidade_condominioId_fkey` FOREIGN KEY (`condominioId`) REFERENCES `condominio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `movimentacao_unidadeId_idx` ON `movimentacao`(`unidadeId`);
DROP INDEX `Movimentacao_unidadeId_fkey` ON `movimentacao`;

-- RedefineIndex
CREATE INDEX `movimentacao_visitanteId_idx` ON `movimentacao`(`visitanteId`);
DROP INDEX `Movimentacao_visitanteId_fkey` ON `movimentacao`;

-- RedefineIndex
CREATE INDEX `unidade_condominioId_idx` ON `unidade`(`condominioId`);
DROP INDEX `Unidade_condominioId_fkey` ON `unidade`;
