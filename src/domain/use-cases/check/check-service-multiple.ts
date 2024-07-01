import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccesCallback = (( ) => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    //Metodo para recorrer el logRepository llama al metodo saveLog y guarda
    private callLogsRepository( log: LogEntity ){
        this.logRepository.forEach( logRepository => {
            logRepository.seveLog(log);
        })
    }

    public async execute( url: string ):Promise<boolean>{

        try {
            const req = await fetch( url );
            if ( !req.ok ) throw new Error(`Error on check service ${url}`);
            
            //Usando el Repository para crear log
            const log = new LogEntity({
                message: `Service ${url} working`, 
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });

            this.callLogsRepository(log);
            this.successCallback && this.successCallback(); //condicional si existe successCallback mando a lllamar 
            
            return true;
        } catch (error) {

            const errorMessage = `Service ${url} is not ok. ${error}`;
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.error, 
                origin: 'check-service.ts'
            });
            this.callLogsRepository(log);
            this.errorCallback && this.errorCallback(errorMessage);//condicional si existe errorCallback mando a lllamar 
            
            return false;
            
        }

    }
}