import * as winston from "winston"

export const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            filename: "logFile.swift.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
})

logger.exceptions.handle(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf((info) => {
                return `${info.timestamp} [EXCEPTION]: ${info.message}`
            })
        )
    }),
    new winston.transports.File({ filename: "uncaughtExceptions.log"})
)

logger.rejections.handle(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf((info) => {
            return `${info.timestamp} [REJECTION]: ${info.message}`
        }))
    }),
    new winston.transports.File({filename: "unhandledExceptions.log"})
)
