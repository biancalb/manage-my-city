import { Router } from 'express';
import { CidadesController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Olá, dev');
});

router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);

export { router };