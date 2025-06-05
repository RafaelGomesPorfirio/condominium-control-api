export interface Unidade {
  id: number;
  numeroUnidade: string;
  blocoUnidade?: string | null;
  andarUnidade?: number | null;
  tipoUnidade?: string | null;
  condominioId: number;
  condominio?: Condominio;
}

export interface UnidadeCreateInput {
  numeroUnidade: string;
  blocoUnidade?: string;
  andarUnidade?: number;
  tipoUnidade?: string;
  condominioId: number;
}

export interface UnidadeUpdateInput extends Partial<UnidadeCreateInput> {}

interface Condominio {
  id: number;
  nomeCondominio: string;
  enderecoCondominio: string;
}