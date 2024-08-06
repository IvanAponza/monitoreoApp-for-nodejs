import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

//Tabla de equivalencia conversion con la DB
const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    error: SeverityLevel.ERROR
}

export class PostgreLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level]; //Ahora tenemos la enum q viene de Postgre

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });

        // console.log('Postgre saved');
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severityEnum[severityLevel];

        const dbLogs = await prismaClient.logModel.findMany({
            where: { level }
        });

        return dbLogs.map( LogEntity.fromObject );
    }

}