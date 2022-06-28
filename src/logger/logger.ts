import winston from 'winston';
import 'winston-daily-rotate-file';
import { Task } from '../interfaces/task.interface';

const Logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'log-%DATE%.json',
            dirname: './logs',
            level: 'debug',
            maxSize: '10mb',
            maxFiles: '7d'
        })
    ],
    exitOnError: false
})

export default Logger;