import { createLogger, format, transports } from 'winston';
import * as morgan from 'morgan';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message, meta }) => {
    return `${timestamp} [${level}] ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

function getLogger() {
    const logger = createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            logFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: '../../../Logger/logs.log' })
        ]
    });


    return logger;
}

export const morganLogger = morgan('combined', {
    stream: {
        write: (message: string) => {
            getLogger().info(message.trim());
        }
    }
});