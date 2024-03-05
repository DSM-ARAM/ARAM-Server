import winston, { createLogger, format } from 'winston';

export const levAndColor = {
  levels: {
    crit: 0,
    error: 1,
    warn: 2,
    notice: 3,
    info: 4,
    debug: 5,
  },
  colors: {
    crit: 'red',
    error: 'magenta',
    warn: 'yellow',
    notice: 'blue',
    info: 'white',
    debug: 'grey',
  }
}

export const WinstonOptions = createLogger({
  levels: levAndColor.levels,
  exitOnError: false,
  transports: [
    new winston.transports.File({ filename: 'critical.log', level: 'crit'}),
    new winston.transports.File({ filename: 'error.log', level: 'error'})
  ],
  format: format.combine(
    format.splat(),
    format.printf(({level, message}) => `[${level}] ${new Date().toISOString()} [ARAM SERVER] - ${message}`)
  )
});

// Syslog format refer : https://yeonfamily.tistory.com/22
// Syslog Format : RFC3164
// <priority>[timestamp] [hostname] [processname] [message]