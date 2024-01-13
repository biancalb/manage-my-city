import { Router } from 'express';
import { StatusCodes} from 'http-status-codes';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Olá, dev');
});

router.post('/teste', (req, res) => {
    console.log(req.body);
    return res.status(StatusCodes.OK).json('Teste');
});

export { router };