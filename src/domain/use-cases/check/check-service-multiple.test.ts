import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('Prueba en check-service.tes', () => {

    //Creamos los mock de los dependencia q necesita use cas
    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3], 
        successCallback,
        errorCallback,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch return true', async() => {

        const wasOk = await checkServiceMultiple.execute('https://google.com')
        expect(wasOk).toBe(true)

        //Evaluamos las depend del chekCervice
        expect(successCallback).toHaveBeenCalled()//se espera que sea llamdo
        expect(errorCallback).not.toHaveBeenCalled()// se espera que no sea llamdo
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    });
    test('should call errorCallback when fetch return false', async() => {

        const wasOk = await checkServiceMultiple.execute('https://goooooooooooogle.com')

        expect(wasOk).toBe(false)

        //Evaluamos las depend del chekCervice
        expect(successCallback).not.toHaveBeenCalled()// se espera que no sea llamdo
        expect(errorCallback).toHaveBeenCalled()//se espera que sea llamdo
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    });
})