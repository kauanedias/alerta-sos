import { Request, Response } from 'express';
import { checkDatabase } from '../models/status.model';

export async function getStatus(req: Request, res: Response) {
    try {
        const database = await checkDatabase();

        res.status(200).json({
            status: 'online',
            database: 'connected',
            serverTime: database,
            version: '1.0.0'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected'
        });
    }
}