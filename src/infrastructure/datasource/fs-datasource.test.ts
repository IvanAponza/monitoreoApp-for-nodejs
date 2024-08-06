import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './fs-datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('Pruebas fs.Datasource.ts', () => {

    const logPath = path.join(__dirname, '../../../logs')
    // console.log({logPath})

    beforeEach(() => {
        //remueve si existe el path
        fs.rmSync(logPath, {recursive: true, force: true});
    })
    test('should create log files if they do not exist', () => {
      new FileSystemDatasource()//crea nuevamente dir logs
      const files = fs.readdirSync(logPath);
        //   console.log(files)
        expect(files).toEqual([ 'logs-all.log', 'logs-error.log', 'logs-medium.log' ]); //archiv que debe tener
    })

    test('should save a log in logs-all.log', () => {
      
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log) //grava el log
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        // console.log(allLogs)
        expect(allLogs).toContain(JSON.stringify(log));

    })
    test('should save a log in logs-all.log and medium', () => {
      
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log) //grava el log
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        // console.log(allLogs)
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    })

    test('should save a log in logs-all.log and logs-error.log', () => {
      
        const logDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.error,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log); //grava el log

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const errorLogs = fs.readFileSync(`${logPath}/logs-error.log`, 'utf-8');
        // console.log(allLogs)
        expect(allLogs).toContain(JSON.stringify(log));
        expect(errorLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async() => {
      
        const logDatasource = new FileSystemDatasource();

        const logLow = new LogEntity({
            message: 'log-low',
            level: LogSeverityLevel.low,
            origin: 'low'
        });
        const logMedium = new LogEntity({
            message: 'log-medium',
            level: LogSeverityLevel.medium,
            origin: 'medium'
        });
        const logError = new LogEntity({
            message: 'log-error',
            level: LogSeverityLevel.error,
            origin: 'error'
        });

        //grabar db
        await logDatasource.saveLog(logLow)
        await logDatasource.saveLog(logMedium)
        await logDatasource.saveLog(logError)

        //Leer logs
        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium= await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsError = await logDatasource.getLogs(LogSeverityLevel.error);

        //esperamos
        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logError]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsError).toEqual(expect.arrayContaining([logError]));
    });

    test('should not throw an error if path exists', () => {
      
        new FileSystemDatasource()// crea path logs
        new FileSystemDatasource()// ya existe llama return

        expect(true).toBeTruthy();


    });

    test('should throw an error if serity level is not defined', async() => {
      
        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'SUPER_MEGA_HIGTH' as LogSeverityLevel;

        try {
            //Esto nunca deberia de ejecutarse
            await logDatasource.getLogs(customSeverityLevel);

            expect(true).toBeFalsy();
        } catch (error) {
            const errorString = `${error}`;
            // console.log(errorString);

            expect(errorString).toContain(`${ customSeverityLevel } not implemented`)
        }

    });
      
})