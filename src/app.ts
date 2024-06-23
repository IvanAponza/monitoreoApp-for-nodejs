import { PrismaClient } from "@prisma/client";
import { envs } from "./config/adapter/envs";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


( async() => {
    main();
})();

async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     level: 'low',
    //     origin: 'App.ts',
    // });

    // await newLog.save();
    // console.log(newLog);

    //obtener todos los registro
    // const logs = await LogModel.find();
    // console.log(logs);

    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'ERROR',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });
    // console.log(newLog);

    //obtener todos los registro
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'LOW'
    //     }
    // });
    // console.log(logs);

    Server.start();
}