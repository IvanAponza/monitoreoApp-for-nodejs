import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";


describe('Prueba logDatasource.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    })

    //Preparamos Mock para implementar la interfaz
    class MockLogDatasource implements LogDatasource{

        //no se nesecita que funcione a cabalidad con que retorne algo ya esta LO REALMENTE IMPORTANTE ES QUE IMPLEMENTE LA INTERFAZ
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }
    test('should test the abstract class', async() => {

        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource); //instancia
        expect(typeof mockLogDatasource.saveLog).toBe('function'); //debe contener el metodo
        expect(typeof mockLogDatasource.getLogs).toBe('function'); //debe contener el metodo

        //probamos los argumentos
        await mockLogDatasource.saveLog(newLog);
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.error);
        
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    })
})