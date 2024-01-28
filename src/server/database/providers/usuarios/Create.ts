import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<Number | Error> => {
    try {
        const [result] = await Knex(ETableNames.usuario).insert(usuario).returning('id');

        if (typeof result === 'object'){
            return result.id;
        } else if (typeof result === 'number'){
            return result;
        }
        
        return new Error(`Erro ao cadastrar ${ETableNames.usuario}.`);
        
    } catch (error) {
        console.log('error= ' + error);
        return new Error(`Erro ao cadastrar ${ETableNames.usuario}.`);
    }
};