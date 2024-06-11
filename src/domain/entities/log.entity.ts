
export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    error   = 'error',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    
    public level: LogSeverityLevel; //Enum
    public message: string;
    public origin: string;
    public createdAt: Date;

    constructor(options: LogEntityOptions){

        const { message, level, origin, createdAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.createdAt = new Date();
        this.origin = origin;
    }

    //convierte la data a form json de los logs 
    static fromJson = ( json: string ): LogEntity => {

        const { message, level, createdAt, origin } = JSON.parse(json);

        if( !message || !level ) throw new Error('Invalid log data');

        const log = new LogEntity({ message, level, createdAt, origin });

        return log;
    }
}