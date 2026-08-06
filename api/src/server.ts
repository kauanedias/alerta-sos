import 'dotenv/config';

import { connection } from './database/connection';
import { app } from './app';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        const conn = await connection.getConnection();

        console.log('Banco de dados conectado com sucesso.');

        conn.release();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
}

startServer();