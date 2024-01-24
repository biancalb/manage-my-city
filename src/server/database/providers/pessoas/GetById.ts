import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';

export const getById = async (id: number): Promise<IPessoa | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa).where('id', id).first();

        if(result) return result;

        return new Error(`Não foi possível encontrar ${ETableNames.pessoa} id= ${id}.`);
    
    } catch (error) {
        console.log('error= ' + error);
        return new Error(`Erro ao buscar ${ETableNames.pessoa} ${id}.`);
    }
};