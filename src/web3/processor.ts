import { Job, DoneCallback } from 'bull';

export default function (job: Job, cb: DoneCallback) {
  this.logger.debug(`[${process.pid}] ${JSON.stringify(job.data)}`);
  cb(null, 'It works');
}
