import mongoose from "mongoose";
import { envs } from "../../config/adapter/envs";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo.log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


describe('Pruebas en mongo.log.datasource.ts', () => {
    
    const logDatasource = new MongoLogDatasource();

    const log = new LogEntity({
        message: 'test message',
        level: LogSeverityLevel.medium,
        origin: 'mongo.log.datasource.test.ts'
    })

    //Nos conectamos a DB
    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    //Elimina todos logs DB despues de probar
    afterEach(async() => {        
        await LogModel.deleteMany();
    })

    //Nos desconectamos despues de todas las pruebas
    afterAll(() => {
        mongoose.connection.close();
    })

    test('should create log', async() => {
        
        const logSpy = jest.spyOn(console, 'log');

        await logDatasource.saveLog(log)

        expect (logSpy).toHaveBeenCalled();//haber sido llam
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created.", expect.any(String));//llamad con

    });

    test('should get log', async() => {

        await logDatasource.saveLog(log); //crea log
      
        const logs = await logDatasource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    })
    
});