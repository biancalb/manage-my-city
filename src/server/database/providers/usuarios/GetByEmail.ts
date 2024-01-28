import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await Knex(ETableNames.usuario).where('email', email).first();

        if(result) return result;

        return new Error(`Não foi possível encontrar ${ETableNames.usuario} email= ${email}.`);
    
    } catch (error) {
        console.log('error= ' + error);
        return new Error(`Erro ao buscar ${ETableNames.usuario} ${email}.`);
    }
};