# This project for educational purposes only.

## How to start the project

### First clone the project
- Download the project from the repository
- Open the project in your favorite IDE

### Second install the dependencies
- Run `npm install` in the terminal

### Set the environment variables
- Create a `.env.development` file in the root of the project
- Add the following variables to the file
```
NODE_ENV=development
PORT=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
RESET_PASSWORD_SECRET=
```

#### How to get secrets
````bash
openssl rand -hex 64
````

### Start the project
- Run `npm start` in the terminal
- The project will start on the port you specified in the `.env.development` file
- You can now access the project on `http://localhost:PORT`
- The project will automatically restart if you make any changes
- You can now start making changes to the project

# Happy coding