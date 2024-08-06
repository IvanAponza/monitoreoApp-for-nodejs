import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('Prueba en check-service.tes', () => {

    //Creamos los mock de los dependencia q necesita use cas
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckService(
        mockRepository, 
        successCallback,
        errorCallback,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch return true', async() => {

        const wasOk = await checkService.execute('https://google.com')
        expect(wasOk).toBe(true)

        //Evaluamos las depend del chekCervice
        expect(successCallback).toHaveBeenCalled()//se espera que sea llamdo
        expect(errorCallback).not.toHaveBeenCalled()// se espera que no sea llamdo
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    });
    test('should call errorCallback when fetch return false', async() => {

        const wasOk = await checkService.execute('https://goooooooooooogle.com')

        expect(wasOk).toBe(false)

        //Evaluamos las depend del chekCervice
        expect(successCallback).not.toHaveBeenCalled()// se espera que no sea llamdo
        expect(errorCallback).toHaveBeenCalled()//se espera que sea llamdo
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    });
})