import { LogDatasource } from "../datasources/log.datasource"
import { LogEntity, LogSeverityLevel } from "../entities/log.entity"


describe('Prueba en log.repository.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    })

    class MockLogRepository implements LogDatasource{

        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
        
    }

    test('should test the asbtract class', async() => {

        const mockLogRepository = new MockLogRepository();

        expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
        expect(typeof mockLogRepository.saveLog).toBe('function');
        expect(typeof mockLogRepository.getLogs).toBe('function');

        await mockLogRepository.saveLog(newLog);
        const logs = await mockLogRepository.getLogs(LogSeverityLevel.error);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);

    })
})