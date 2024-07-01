# Aplication the monitoring with Nodejs

The goal is to create a clean architecture task monitoring application with typeScript - El objetivo es crear una aplicación de monitoreo de tareas con arquitectura limpia con typeScript

# dev
1. Duplicar el archivo .env.template y renombrar a .env
2. Configurar las Variables de entorno en .env
3. Insatalar las dependencias con el comando
    ```
    npm install

    ```
4. Levantar las bases de datos con el comando
    ```
    docker compose up -d

    ```
5. Ejecutar el comando para crear las migraciones i egeneral Prisma Client
    ````
    npx prisma migrate dev

    ```
6. Levantar el servidor con el comando 
    ```
    npm run dev
    
    ```

## Obtener Gmail Key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)