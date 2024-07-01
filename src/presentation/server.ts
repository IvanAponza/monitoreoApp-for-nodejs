import { envs } from "../config/adapter/envs";
import { CheckService } from "../domain/use-cases/check/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/check/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log";
import { FileSystemDatasource } from "../infrastructure/datasource/fs-datasource";
import { MongoLogDatasource } from "../infrastructure/datasource/mongo.log.datasource";
import { PostgreLogDatasource } from "../infrastructure/datasource/postgre.log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/fs-repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

//crea las instancias de las implements
// const logRepository = new LogRepositoryImpl( 
//     // new FileSystemDatasource(),
//     // new MongoLogDatasource(),
//     new PostgreLogDatasource(),
// );

//instancia para grabar en multiples DB
const fslogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource(),
);
const mongologRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);
const postgreslogRepository = new LogRepositoryImpl(
    new PostgreLogDatasource(),
);

const emailService = new EmailService();

//Example
// const mongoLogRepository = new LogRepositoryImpl( 
//     new MongoLogDatasource(),
//     new posgreSQLLogDatasource(),
// );


export class Server {
    public static start(){

        console.log("Server started...");

        //Mandar E-mail

        // const emailService = new EmailService()
        // emailService.sendEmail({
        //     to: 'joselito881218@hotmail.com',
        //     subject: 'Logs de sistema',
        //     html: `
        //         <h3>Logs de Sistema monitoreo Node</h3>

        //         <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto</h3>
        //         <p>VER LOGS ADJUNTOS</h3>
        //     `
        // })

        //Mandar E-mail con adjuntos
        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLogs(

        //     ['joselito881218@hotmail.com', 'joselito881218@gmail.com']
        // );

        //Mandar E-mail consumiendo caso de uso
        // new SendEmailLogs( 
        //     emailService, 
        //     fileSystemLogRepository 
        // ).execute(
        //     ['joselito881218@hotmail.com', 'joselito881218@gmail.com']
        // )

        //Guardar en una DB
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`Service ${url} is ok`),
        //             ( error ) => console.log(error),
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );
        //     }
        // ); 

        //Guardar en multiples DB
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com'
                new CheckServiceMultiple(
                    [fslogRepository, mongologRepository, postgreslogRepository],
                    () => console.log(`Service ${url} is ok`),
                    ( error ) => console.log(error),
                ).execute( url );
            }
        ); 
    }
}