import nodemailer from 'nodemailer';
import { envs } from '../../config/adapter/envs';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachements?: Attachements[];
}

//Attachements
export interface Attachements {
    filename: string;
    path: string;
}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(){}

    //Metodo para enviar E-mail
    async sendEmail( options: SendMailOptions):Promise<boolean>{

        const { to, subject, html, attachements=[] } = options;

        try {

            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: html,
                attachments: attachements
            });

            // console.log(sendInformation);
            // sendInformation se puede retornar todos los destinatarios que no les llego el email

            return true;
        } catch (error) {
            return false;
        }

    }

    //Metodo para enviar email con archivos adjunto a varios destinatarios
    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs del servidor';
        const html = `
            <h3>Logs de Sistema monitoreo Node</h3>
            <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto</p>
            <p><b>Ver logs Adjuntos</b></p>
        `;
        const attachements: Attachements[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-error.log', path: './logs/logs-error.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ];

        return  this.sendEmail({ to, subject, html, attachements });
    }


}