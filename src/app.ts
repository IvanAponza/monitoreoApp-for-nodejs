import { envs } from "./config/adapter/envs";
import { Server } from "./presentation/server";


( async() => {
    main();
})();

function main(){
    Server.start();
    // console.log(envs.MAILER_EMAIL)
}