import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa).where('id', id).del(['id']);

        if (typeof result === 'number' && result > 0) return;

        return new Error(`Erro ao excluir ${ETableNames.pessoa}.`);
    
    } catch (error) {
        console.log('error= ' + error);
        return new Error(`Erro ao exluir ${ETableNames.pessoa}.`);
    }
};