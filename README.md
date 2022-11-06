# SSE-dating-app-backend
## QuickStart
1. Please make sure your MySQL is running and the version should be 8.0.22.
2. Create a database named `SSE-dating-app` by running: 

    ```
    CREATE DATABASE `SSE-dating-app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
    ```
3. In this new database, running the SQL script in `./SSE-dating-app.sql`
4. Change the SQL configuration inside `./config/config.default.js`, locate to the following object and change your MySQL port, username, and password: 
    ```
    config.mysql = {
        client: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'SSE-dating-app',
        },
    };
    ```
5. Please make sure your node.js version is v.14.20.1
6. Make sure port:7001 is not in used
6. Run `npm run dev` to start the server, the backend will be running in http://localhost:7001
