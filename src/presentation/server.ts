import { CheckService } from "../domain/use-cases/check/check-service";
import { FileSystemDatasource } from "../infrastructure/datasource/fs-datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/fs-repository.impl";
import { CronService } from "./cron/cron-service";

//crea las instancias de las implements
const fileSystemLogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource(),
);

//Example
// const mongoLogRepository = new LogRepositoryImpl( 
//     new MongoLogDatasource(),
//     new posgreSQLLogDatasource(),
// );


export class Server {
    public static start(){

        console.log("Server started...");

        //Mandar E-mail

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`Service ${url} is ok`),
        //             ( error ) => console.log(error),
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );
        //     }
        // ); 
    }
}