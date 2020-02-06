# Calculator Stream

### Author: Nam Phung

[https://morning-waters-14032.herokuapp.com/](https://morning-waters-14032.herokuapp.com/)

A web application that keeps a stream of computations as they come in.

## Features
- The calculator is able to handle complex arithmetic expressions, including those that use parentheses to indicate precedence. For this demo, user inputs are assumed to be good inputs.
- The arithmetic expressions are not allowed to exceed 15 characters.
- The results of the computations are logged as a stream in the history tab.

## Future Developments
- Error handling, both on the client and server sides, eg. user input validation, connection errors, etc.
- UI/UX polishing.
- Adding (anonymous) user identification and associating users with their computations.

## Build and Run

First, change directory in to the root of this project.

1. Using Docker:
Use the following command to spin up a complete development environment
```
docker-compose up
```

2. Running the server and client separately:

To start the server, make sure you are in the root of the project. Then run this command to install the dependencies.
```
yarn
```

You also need to configure a `Redis` instance, and point the environment variable `REDIS_URI` to your instance's URI. You also need to find the `package.json` file in the `client` folder, and update the `proxy` field to be `http://localhost:4000`. This ensure that API requests made by the client application are routed correctly during development.

Then, use this command to start the server
```
yarn dev
```
We are using `nodemon` to enable hot reloading for the server code. To get the client application started, change directory into the `client` folder, then use the following two commands
```
yarn 
```

```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Architecture:
1. Server: The server is written in Node.js, and uses the Express framework. We also used `socket.io` as a high-level WebSocket API to enable two-way communication between the server and the client.
2. Data Storage: We use Redis both as a persistence data store and a Pub/Sub broker.
3. Client: The client application is written using the React library.
