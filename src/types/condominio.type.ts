export interface Condominio {
  id: number;
  nomeCondominio: string;
  enderecoCondominio: string;
  unidade?: Unidade[];
}

export interface CondominioCreateInput {
  nomeCondominio: string;
  enderecoCondominio: string;
}

export interface CondominioUpdateInput extends Partial<CondominioCreateInput> {}

interface Unidade {
  id: number;
  numeroUnidade: string;
  blocoUnidade?: string | null;
  andarUnidade?: number | null;
  tipoUnidade?: string | null;
}