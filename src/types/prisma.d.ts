import { Prisma, condominio } from '@prisma/client';

declare module '@prisma/client' {
  export interface VisitanteCreateInput {
    nome: string;
    documento: string;
    telefone?: string | null;
  }

  export interface VisitanteUpdateInput {
    nome?: string;
    documento?: string;
    telefone?: string | null;
  }

  export type Condominio = condominio;

  export interface CondominioCreateInput {
    nome: string;
    endereco: string;
  }

  export interface CondominioUpdateInput extends Partial<CondominioCreateInput> {}

  // Exportando os tipos de erro do Prisma
  export import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = Prisma.PrismaClientUnknownRequestError;
  export import PrismaClientValidationError = Prisma.PrismaClientValidationError;
}