import 'winston-mongodb'
import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import { EApplicationEnvironment } from '../constant/application'
import config from '../config/config'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'
import { red, blue, yellow, green, magenta } from 'colorette'
// import { info } from 'console'
import { MongoDBTransportInstance } from 'winston-mongodb'

// Linking trace support
sourceMapSupport.install()

const colorizeLevel = (level: string) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta } = info

    const customLevel = colorizeLevel(level.toUpperCase())
    const customTimestamp = green(timestamp as string)
    const customMessage = message
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null
    })
    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n ${magenta('META')} ${customMeta}`
    return customLog
})

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const logMeta: Record<string, unknown> = {}
    // for (const [key, value] of Object.entries(meta)) {
    //     if (value instanceof Error) {
    //         logMeta[key] = {
    //             name: value.name,
    //             message: value.message,
    //             trace: value.stack || ''
    //         }
    //     } else {
    //         logMeta[key] = value
    //     }
    // }
    if (typeof meta === 'object' && meta !== null && !Array.isArray(meta)) {
        for (const [key, value] of Object.entries(meta)) {
            if (value instanceof Error) {
                logMeta[key] = {
                    name: value.name,
                    message: value.message,
                    trace: value.stack || ''
                }
            } else {
                logMeta[key] = value
            }
        }
    }
    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    }
    return JSON.stringify(logData, null, 4)
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}

const FileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

const MongodbTransport = (): Array<MongoDBTransportInstance> => {
    return [
        new transports.MongoDB({
            level: 'info',
            db: config.MONGO_LOCAL_URL as string,
            metaKey: 'meta',
            expireAfterSeconds: 3600 * 24 * 30,
            options: {
                useUnifiedTopology: true
            },
            collection: 'application-logs'
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...FileTransport(), ...consoleTransport(), ...MongodbTransport()]
})
