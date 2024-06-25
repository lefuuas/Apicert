import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import rotas from './routes/PDFtransitor.js';
import 'dotenv/config';

const server = express();

server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(cookieParser());
server.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ status_code: 400, data: 'Requisição inválida: JSON mal formado' });
    }
    next();
});

server.use(rotas);

server.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
