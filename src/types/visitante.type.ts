export interface Visitante {
  id: number;
  nomeVisitante: string;
  documentoVisitante: string;
  telefoneVisitante?: string | null;
}

export interface VisitanteCreateInput {
  nomeVisitante: string;
  documentoVisitante: string;
  telefoneVisitante?: string;
}

export interface VisitanteUpdateInput extends Partial<VisitanteCreateInput> {}