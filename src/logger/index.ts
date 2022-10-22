import logger from 'pino';
import dayjs from 'dayjs';
import pretty from 'pino-pretty';

const log = logger({
  prettifier: pretty,
  base:{
    pid: false
  },
  timestamp: () => `,"time":${dayjs().format()}"`
})

export default log;