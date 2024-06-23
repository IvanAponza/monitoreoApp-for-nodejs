# Aplication the monitoring with Nodejs

The goal is to create a clean architecture task monitoring application with typeScript - El objetivo es crear una aplicación de monitoreo de tareas con arquitectura limpia con typeScript

## 🚀 Installation - Instalación

```
npm install
```

## Run and execute the application - Correr y ejecutar la aplicación

1. development

```
npm run dev
```
2. Configure environment variables - Configurar las variables de entorno
    - create a .env file with the following - crear un archivo .env con lo siguiente.
    
    ````
    PORT=3000

    PROD=false

    MAILER_EMAIL=
    MAILER_SECRET_KEY=

    ````

3. Production

```
npm start
```

4. Levantar las bases de datos con el comando

```
docker compose up -d

```