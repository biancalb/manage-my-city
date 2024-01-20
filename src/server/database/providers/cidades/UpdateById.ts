import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.cidade).where('id', id).update(cidade);

        if (typeof result === 'number' && result > 0) return;

        return new Error(`Erro ao modificar ${ETableNames.cidade} id ${id}.`);

    } catch (error) {
        console.log('error= ' + error);
        return new Error(`Erro ao modificar ${ETableNames.cidade}.`);
    }
};