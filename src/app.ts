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
    // const logs = await LogModel.find();
    // console.log(logs);

    Server.start();
}