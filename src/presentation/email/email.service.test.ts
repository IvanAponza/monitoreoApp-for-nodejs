import nodemailer from 'nodemailer'
import { EmailService, SendMailOptions } from "./email.service";



describe('EmailService', () => {

    const mockSendMail = jest.fn();

    //mock al createTranspor cuando no se tiene correo valido o activo
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    test('should send email', async() => {
        

        const options: SendMailOptions = {
            to: 'aponzacantoni@gmail.com',
            subject: 'Test',
            html: '<h1>Test</h1>'
        }

        // const emailSent = await emailService.sendEmail(options)
        // expect(emailSent).toBe(true)
        
        await emailService.sendEmail(options)

        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array), 
            "html": "<h1>Test</h1>", 
            "subject": "Test", 
            "to": "aponzacantoni@gmail.com"}
        )
    });

    test('should send email with attachments', async() => {

        const email = 'aponzacantoni@gmail.com';
        await emailService.sendEmailWithFileSystemLogs(email)

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-error.log', path: './logs/logs-error.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
            ])

        })
    })
})