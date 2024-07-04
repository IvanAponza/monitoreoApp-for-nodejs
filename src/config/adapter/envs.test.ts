import { envs } from "./envs"


describe('Prueas en envs.ts', () => {

    test('should return env options', () => {

        // console.log(envs)
        expect( envs ).toEqual({
            PORT: 3000,
            PROD: false,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'aponzacantoni@gmail.com',
            MAILER_SECRET_KEY: 'rfdffdxnuhotxlmo',
            MONGO_URL: 'mongodb+srv://ivanaponza:ic123456789@cluster0.yyvogrg.mongodb.net/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'ivanaponza',
            MONGO_PASS: 'ic123456789'
        })
    })

    test('should return error if not found env', async() => {

        jest.resetModules() //reset module
        process.env.PORT = 'ABC';

        try {
            await import('./envs');
            expect(true).toBe(false); //nunca se va aejecutar se lanza el error
        } catch (error) {
            // console.log(error)
            expect(`${error}`).toContain('should be a valid integer')
        }
    })
    //todo string
})