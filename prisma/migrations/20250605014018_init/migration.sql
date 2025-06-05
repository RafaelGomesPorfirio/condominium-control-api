-- CreateTable
CREATE TABLE `visitante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeVisitante` VARCHAR(191) NOT NULL,
    `documentoVisitante` VARCHAR(191) NOT NULL,
    `telefoneVisitante` VARCHAR(191) NULL,

    UNIQUE INDEX `visitante_documentoVisitante_key`(`documentoVisitante`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `condominio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCondominio` VARCHAR(191) NOT NULL,
    `enderecoCondominio` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroUnidade` VARCHAR(191) NOT NULL,
    `blocoUnidade` VARCHAR(191) NULL,
    `andarUnidade` INTEGER NULL,
    `tipoUnidade` VARCHAR(191) NULL,
    `condominioId` INTEGER NOT NULL,

    INDEX `unidade_condominioId_idx`(`condominioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitanteId` INTEGER NOT NULL,
    `unidadeId` INTEGER NOT NULL,
    `entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saida` DATETIME(3) NULL,

    INDEX `movimentacao_unidadeId_idx`(`unidadeId`),
    INDEX `movimentacao_visitanteId_idx`(`visitanteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `unidade` ADD CONSTRAINT `unidade_condominioId_fkey` FOREIGN KEY (`condominioId`) REFERENCES `condominio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_visitanteId_fkey` FOREIGN KEY (`visitanteId`) REFERENCES `visitante`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
