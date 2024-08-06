import { LogEntity, LogSeverityLevel } from "./log.entity"


describe('Pruebas en lo.entity.ts', () => {

    const dataObj = {
        message: 'Hola Mundo',
        level: LogSeverityLevel.error,
        origin: 'log.entity.test.ts',
        createdAt: new Date()
    }
    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from json', () => {
        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-07-01T03:40:15.594Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    // test('should throws an error if message is missing from json', () =>{
    //     const log = { level: dataObj.level};
    //     const json = JSON.stringify({log})

    //     expect(() => {
    //         LogEntity.fromJson(json);
    //     }).toThrow('Invalid log data')
    // });

    // test('throws an error if level is missing from json', () => {
    //     const log = { message: dataObj.message};
    //     const json = JSON.stringify({log})
    
    //     expect(() => {
    //       LogEntity.fromObject({json});
    //     }).toThrow('Invalid log data');
    // });
    test('should create a LogEntity instance from object', () => {
        
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    // test('throws an error if message is missing from obj', () => {
        
    //     const log = { level: dataObj.level};

    //     expect(() => { LogEntity.fromObject(log) }).toThrow('Invalid log data');
    // });

    // test('throws an error if level is missing', () => {

    //     const log = { message: dataObj.message};
    
    //     expect(() => {LogEntity.fromObject(log)}).toThrow('Invalid log data');
    // });

});