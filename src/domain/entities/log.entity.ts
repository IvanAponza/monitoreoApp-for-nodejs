
export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    error   = 'error',
}

export class LogEntity {
    public level: LogSeverityLevel; //Enum
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    //convierte la data a form json de los logs 
    static fromJson = ( json: string): LogEntity => {
        const { message, level, createdAt} = JSON.parse(json);
        if( !message || !level) throw new Error('Invalid log data');

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;
    }
}