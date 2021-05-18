/* eslint-disable camelcase */
export interface ICreateAgendamentoDTO {
   provider_id: string;
   user_id: string;
   from: number;
   user_name?: string;
   telefone: number;
   avatar: string;
   at: number;
   dia: number;
   mes: number;
   ano: number;
   service: string;
}
