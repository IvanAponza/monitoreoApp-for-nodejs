import { LogEntity } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"
import { SendEmailLogs } from "./send-email-log"


describe('Prueba sendEmailLogs', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );
    beforeEach(() => {
        jest.clearAllMocks(); //limpia dsp de cada prueba
    })
    test('should call sendEmail and saveLog', async() => {

        const result = await sendEmailLogs.execute('aponzacantoni@gmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);//llamado almenos 1 vez
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low", 
            message: "Log email sent", 
            origin: "send-email-log.ts"
        })
    })
    test('should log in case of error', async() => {
        
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false); //forza q return false

        const result = await sendEmailLogs.execute('aponzacantoni@gmail.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);//llamado almenos 1 vez
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "error", 
            message: "Error: Email log not sent", 
            origin: "send-email-log.ts"
        })
    })
})