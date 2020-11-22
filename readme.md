## Chatbee

## Installation
Clone the project with the following HTTPS: https://git.cardiff.ac.uk/c1623793/web-chat-project-main.git \
or \
Download and unzip ChatBee from the following GIT repository link. 
## Getting Started
These instructions will help you get a fresh copy of the project and run it on the local machine for development and testing purposes.
Prerequisites

The things that you need to run the code are:

```sh
Visual Studio IDE
Node Package Manager (npm)
NodeJs
Internet
```

## Running
These are the step by step instructions that will tell you how to get the app running for development and testing as well as production. All dependencies must be installed in order for the software to work correctly, navigate to **main/root**, **frontend**, and **backend** and use the command below on project terminal.

```sh
$ npm install
```

Once installation is complete, you can now run the chatbee web project in a separated manner. This was designed to support running separately to be ready for separate deployments. Especially if you have separate hosting for the frontend and backend.


```sh
cd frontend
$ npm run start
```

```sh
cd backend
$ npm run start
```

It can also run by navigating to the root of the project and then run it from there.
npm run start
Or

```sh
$ npm run build && npm run prod
```

The application is using a cloud hosted database for simplicity as well as for compatibility reasons. However, you can reconfigure things at the backend if you wanted it to connect through a different instance of the database.
The frontend application will be hosted on the port **3001** so make sure to free that port to allow the frontend to run. The backend will run on port **3000** so make sure to free the port to avoid problems on running it there.

To use the web application, you need to open up a browser (preferably google chrome) and navigate to **http://localhost:3001** and open up 2 tabs to simulate a conversation. The user must also need to be online since the database is hosted in the cloud and some functions will not work properly. Alternatively, you can reconfigure things on the backend to set an offline instance of mongodb if you have one.
The landing page should be the first thing to show up; you should see the Chatbee interface. You should see a welcome greeting. Upon visiting, you are automatically assigned a username for you to use. You can also see the number of registered users as well as number of messages sent. You can also upload a picture optionally. Once that you clicked enter the hive button, you will see the actual chat application. On the left side will be the active users and on the middle would be the actual chat box. You can type and chat in what you want to say in the message box and you can press enter key or just click submit button.You can see your own messages on the left side and other user’s will go to the right side, If you also hover you can see the timestamp when the message was sent. You can click disconnect after you are done connecting to it. Upon clicking an alert box will show that you are disconnected and then redirect you to the exit page.

## Assumptions Made
- Web Application will run in a decent server.
- Users will only send short messages.
- Users Will only upload valid avatars.

## Mocked Aspects
- The username generator is a mock for a login.

## Project Creation Methods
The frontend was powered with CRA or create-react-app, bootstrap 4, node-sass and socket.io-client. The default option was set as an option when create-react-app was initialized and the dependencies were added afterwards. Bootstrap 4 was added to make use of predefined design classes to speed things up in the designing stage. SCSS was used even when node-sass was installed to override the bootstrap actual class as well as make use of variables in the stylesheets. Socket.io-client was used to communicate with the backend real-time.
The backend was powered by express and is manually made from scratch. Body parser was added to support multiple types of data when handling requests, cors to allow requests from react app to work, formidable was added do parse forms and get data from it. Mongoose to handle all the database logic. Nodemon for the purpose of hot reload when developing and socket.io to handle real-time data.

## Major Choices
### Language
The main language that is used in this project is Javascript. Javascript was used since it is very compatible to use with the frontend as well as backend. Javascript also has a wide set of tools that is evident in the project. You can also check your code with the built in linter in create-react-app but also you can test,deploy and run the webapp without going out of javascript.

### Style
The style that was enforced in this project is simple, Bootstrap is the most popular and a powerful framework that has been used by many companies for years. It helps developers get styles that they want right away by just adding css classes on the markup and in this case the javascript xml.
To support multiple screen sizes, media queries are used in a way that the minimum screen will show a particular style compared to bigger screen sizes.
Scss or sass css was used to overwrite some bootstrap variables such as colors etc. It is also used to simplify things a bit and allow us to use variables inside stylesheets. Compared to plain css it is more extensive and can support big projects if the project will be extended into a bigger scale.


### State Management
The first thing that comes to mind when it comes to state management was to use Redux, a tool to help you do some state management. However, after some careful planning it was realized that the project only needs a simple yet effective way of storing state in order for the webapp to handle the flow of data such as arrays, booleans, and strings to be displayed on the frontend so Redux was a no go.
React hooks was the one that is the right fit for the job. A modern way to manage states in a simple manner by using functions instead of classes.It simplifies code and to the point that the lines of code are shorter and it is not only shorter and cleaner. The react team also advised to use hooks for new projects just like chatbee. You see the official hooks frequently asked questions page in here.
If the project will be extended into a wider scale, The use of react context API is very recommended since it can cater state management globally in a simple way.


### Code Style
The client was configured to follow the default code style that was enforced by the built-in eslint. The create-react-app (CRA) checks the code whether react conventions was met or not. As the development progresses, the code was actually checked as you type the code and give you warnings whenever you failed to meet the code style. A good example for this is that when you declare an image tag but you failed to declare an alt attribute a warning will show up that you needed to add an alt attribute to fix this error and so on. As the official create-react-app (CRA) documentation said it is not advisable to use eslint config to enforce code style and instead use prettier which made the code cleaner and indented. You can read more in here.

### Database
The app needed to persist messages as well as users so the main thing that comes to mind in terms of simplicity was mongodb, it can handle data insertion and manipulation easily. Compared to relational databases, NoSql approach was done in this project since we are only inserting and retrieving data.

## Testing
### Client
The default react testing library was used in this project to test if things are working fine in the client side. The test that was implemented in this project was simple and minimalistic since it only checks if pages are rendering fine. All of the data that will be shown in the client however will be validated in the server.

### Server
The servers will use jest to test specific API endpoints.It will cover basic test cases such as simulating a proper API call, simulating failed API call etc. The thing with test cases is that it can help to see the errors sooner by automating API calls, invoking functions, doing some data handling, and based on the results you can conclude if the software is running properly or not. Tests expects some sort of results from the software and based on that if things match then tests will pass. However, if things are not working fine and well and return another value instead of expected value things will be considered as fail.

## Paradigms Used

### Event-Driven
This paradigm was used since we do have socket.io and asynchronous API calls. Both Express and React uses socket.io which transmits data back and forth by listening and emitting.

### Imperative
This paradigm was used to explicitly update the state by triggering useEffect hook in react frontend. This is also evident in the backend when the API has received the data and will trigger a response and then update the state of the application based on the response.

### Declarative
This paradigm was used since there was a button click function in the webapp that explicitly tells the state to change into the desired state. For example, a button click will change the state to true.

### Functional
The components are made by using functional methods (functional components). Even the backend functions are also made to help achieve results.

## Built With

[**React**](https://create-react-app.dev/) – a modern web app library used to build the frontend.
[Bootstrap](https://www.npmjs.com/package/bootstrap) - Sleek, intuitive, and powerful front-end framework for faster and easier web development.
[Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
[Node-sass](https://www.npmjs.com/package/node-sass) - Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass
[Socket.io-client](https://www.npmjs.com/package/socket.io-client) – socket.io for frontend
[React testing library](https://www.npmjs.com/package/@testing-library/react) - Simple and complete React DOM testing utilities that encourage good testing practices.
NodeJS
Node Package Manager

[**Express**](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
[Body Parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
[Cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
[Formidable](https://www.npmjs.com/package/formidable) - A Node.js module for parsing form data, especially file uploads.
[Mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
[Socket.io](https://www.npmjs.com/package/socket.io) - Socket.IO enables real-time bidirectional event-based communication.
[Clean Jsdoc theme](https://www.npmjs.com/package/clean-jsdoc-theme) - A beautifully crafted theme/template for JSDoc 3. This theme/template looks and feels like a premium theme/template. This is a fully mobile responsive theme and also fully customizable theme
[Jsdoc](https://www.npmjs.com/package/jsdoc) - An API documentation generator for JavaScript.
[Jsdoc http plugin](https://www.npmjs.com/package/jsdoc-http-plugin) - This project is a fork of https://github.com/bvanderlaan/jsdoc-route-plugin Currently, bvanderlaan doesn't seems to be available to maintain the project so i'll continue here.
[Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
[Rotating file stream](https://www.npmjs.com/package/rotating-file-stream) - Opens a stream.Writable to a file rotated by interval and/or size. A logrotate alternative.
[Supertest](https://www.npmjs.com/package/supertest) - HTTP assertions made easy via superagent.
NodeJS, Node Package Manager

