import { error } from "console";
import { CheckService } from "../domain/use-cases/check/check-service";
import { CronService } from "./cron/cron-service";


export class Server {
    public static start(){
        console.log("Server started...");

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com'
                new CheckService(
                    () => console.log(`Service ${url} is ok`),
                    ( error ) => console.log(error),
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000' );
            }
        );

        
    }
}