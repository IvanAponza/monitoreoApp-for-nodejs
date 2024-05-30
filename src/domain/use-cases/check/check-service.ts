interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccesCallback = ( ) => void;
type ErrorCallback = ( error: string ) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ){

    }

    public async execute( url: string ):Promise<boolean>{

        try {
            const req = await fetch( url );
            if ( !req.ok ) throw new Error(`Error on check service ${url}`);
            
            this.successCallback();
            // console.log(`Service ${ url } is ok`);
            
            return true;
        } catch (error) {

            this.errorCallback(`${error}`);
            console.log(`${ error }`)
            return false;
            
        }

    }
}