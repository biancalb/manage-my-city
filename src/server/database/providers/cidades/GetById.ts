import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const getById = async (id: number): Promise<ICidade | Error> => {
    try {
        const result = await Knex(ETableNames.cidade).where('id', id).first();

        if(result) return result;

        return new Error(`Não foi possível encontrar ${ETableNames.cidade} id= ${id}.`);
    
    } catch (error) {
        console.log('error= ' + error);
        return new Error(`Erro ao buscar ${ETableNames.cidade} ${id}.`);
    }
};