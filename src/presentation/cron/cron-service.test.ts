import { CronService } from "./cron-service"



describe('Pruea CronService', () => {

    const mocTick = jest.fn();

    test('should create a job', (done) => {
      const job = CronService.createJob('* * * * * *', mocTick);

      setTimeout(() => {

        expect(mocTick).toHaveBeenCalledTimes(2)
        job.stop();
        done();
      }, 2000);
    })
    
})