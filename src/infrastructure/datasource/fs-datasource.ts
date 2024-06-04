import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath        = 'logs/';
    private readonly allLogsPath    = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly errorLogsPath  = 'logs/logs-error.log';

    constructor(){
        this.createLogsFile(); //llama al dir
    }

    //Asegura que existan los directory
    private createLogsFile = () => {
        if(!fs.existsSync (this.logPath )){
            fs.mkdirSync( this.logPath );
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.errorLogsPath
        ].forEach( path => {
            if( fs.existsSync( path )) return; //si existe no hace nada
            fs.writeFileSync( path, '' ); //si no existe lo crea
        })
    }


    async seveLog(log: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(log)}\n`

        fs.appendFileSync( this.allLogsPath, logAsJson );

        if( log.level === LogSeverityLevel.low ) return;

        if( log.level === LogSeverityLevel.medium ){ 
            //si ellog es level medium lo guarda en dir mediumLogsPath
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }else{
            fs.appendFileSync(this.errorLogsPath, logAsJson);
        }
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');
        //optio 1
        const logs = content.split('\n').map( LogEntity.fromJson)
        //optio 2
        // const logs = content.split('\n').map( log => LogEntity.fromJson(log))

        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return  this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.error:
                return  this.getLogsFromFile(this.errorLogsPath);
            default:
                throw new Error(`${ severityLevel } not implemented`);
        }
    }
}