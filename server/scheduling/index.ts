import { Elysia } from 'elysia'
import { cron } from '@elysiajs/cron'
import { Schedule } from './schedule';
import matchStatuses from './match-statuses';
import { serverEnv } from 'server/env';

const elysia = new Elysia();

const jobs: Array<Schedule> = [
    new matchStatuses()
];

jobs.forEach((job: Schedule) => {
    elysia.use(
        cron({
            name: job.name,
            pattern: job.pattern,
            async run() {
                await job.handler()
            }
        })
    )
})

elysia.listen(serverEnv.SCHEDULER_PORT)
