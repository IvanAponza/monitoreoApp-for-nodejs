import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {

    //DI
    constructor(
        private readonly logDatasource: LogDatasource,
    ) { }

    async seveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.seveLog(log)
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
       return this.logDatasource.getLogs(severityLevel);
    }

}