import mongoose from 'mongoose';
import { Request, Response } from 'express';

export const healthCheck = async (req: Request, res: Response) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    const status = {
        server: {
            status: 'healthy',
            timestamp: new Date(),
            uptime: process.uptime(),
        },
        database: {
            status: dbStatus[dbState],
            host: mongoose.connection.host,
            name: mongoose.connection.name,
        }
    };

    if (dbState !== 1) {
        res.status(500).json({
            success: false,
            message: 'Database is not connected',
        })
        return
    }

    res.status(200).json({
        success: true,
        status,
    });
}