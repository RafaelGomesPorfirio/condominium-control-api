-- CreateTable
CREATE TABLE `condominio` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movimentacao` (
    `id` VARCHAR(191) NOT NULL,
    `visitanteId` VARCHAR(191) NOT NULL,
    `unidadeId` VARCHAR(191) NOT NULL,
    `entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saida` DATETIME(3) NULL,

    INDEX `Movimentacao_unidadeId_fkey`(`unidadeId`),
    INDEX `Movimentacao_visitanteId_fkey`(`visitanteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidade` (
    `id` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `condominioId` VARCHAR(191) NOT NULL,

    INDEX `Unidade_condominioId_fkey`(`condominioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitante` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,

    UNIQUE INDEX `visitante_documento_key`(`documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `Movimentacao_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `Movimentacao_visitanteId_fkey` FOREIGN KEY (`visitanteId`) REFERENCES `visitante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidade` ADD CONSTRAINT `Unidade_condominioId_fkey` FOREIGN KEY (`condominioId`) REFERENCES `condominio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
