## Chatbee

## Getting Started

### Installation
Clone the project with the following HTTPS: https://git.cardiff.ac.uk/c1623793/web-chat-project-main.git \
or \
Download and unzip ChatBee code source. 

### Prerequisites

The things that you need to run the project are:

```sh
Visual Studio IDE
Node Package Manager (npm)
NodeJs
Internet
```

## Running ChatBee Application
Below is the step-by-step guide on how to get the app running for development, testing, and production. Use the command below to install all dependencies in order for the software to work correctly, navigate **frontend**, **backend**, lastly the **main/root**.

```sh
$ npm install
```

Once installation is complete, you can now run the chatbee web project in a separated manner. This was designed to support running separately to be ready for separate deployments, especially if you have separate hosting for the frontend and backend.


```sh
cd frontend
$ npm run start
```

```sh
cd backend
$ npm run start
```

This can also run by navigating to the root of the project and then run it from there, using the command below.
```sh
npm run start
```

Or 

```sh
$ npm run build && npm run prod
```

The application is using a cloud hosted database for simplicity as well as for compatibility reasons. However, you can reconfigure things at the backend if you want it to connect through a different instance of the database.
The frontend application will be hosted on the port **3001** so make sure to free this port to allow the frontend to run. The backend will run on port **3000** so make sure to free this port to avoid problems on running it there. 

To use the web application, you need to open up a browser (preferably google chrome) and navigate to **http://localhost:3001** and open up 2 tabs to simulate a conversation. The user must also need to be online since the database is hosted in the cloud and some functions will not work properly. Alternatively, you can reconfigure things on the backend to set an offline instance of mongodb if you have one. 

The landing page should be the first thing to shows up which is the ChatBee main interface.  You should also see a welcome greeting. Upon visiting, you are automatically assigned a username for you to use, the number of registered users and the number of messages sent can also be seen. Additionally, there is an option where you can upload a picture for your profile. Once you clicked "enter the hive button", you will see the actual chat application. The left side of the chat page contains the list of active users. The middle section of the page contains the chat box, where you can input messages in the message box. Once entered or once the "submit" button is clicked, the message will be sent and can be seen by other users messages in the chat. You can see your own messages on the left side and other user’s will go to the right side. When you hover the mouse cursor over any messages sent, you will be able to see the timestamp of each messages sent. Clicking "disconnect" will cause an alert box to pop-up stating that you have been disconnected from the chat, then redirect you to the exit page.

## Project Creation Methods
The frontend was powered by CRA or create-react-app, bootstrap 4, node-sass and socket.io-client. The default option was set as an option when create-react-app was initialized and the dependencies were added afterwards. Bootstrap 4 was added to make use of predefined design classes to speed things up in the designing stage. SCSS was used even when node-sass was installed to override the bootstrap actual class as well as make use of variables in the stylesheets. Socket.io-client was used to communicate with the backend real-time.
The backend was powered by express and is manually made from scratch. Body parser was added to support multiple types of data when handling requests, cors to allow requests from react app to work and Formidable was added do parse forms and get data from it. Mongoose was used to handle all the database logic and Nodemon for the purpose of hot reload when developing and socket.io to handle real-time data.

## Major Choices
### Language
The main language used in this project is Javascript, required for the completion of this assessment. Javascript was used since it was very compatible to use with the frontend and backend. Javascript also has a wide set of tools that is evident in the project. You can also check your code with the built in linter in create-react-app and also you can test,deploy and run the webapp without going out of javascript.

### Style
The style that was enforced in this project was simple, Bootstrap is the most popular and a powerful framework that has been used by many companies for years. It helps developers get styles that they want right away by just adding css classes on the markup and in this case the javascript xml. 

To support multiple screen sizes, media queries were used in a way that the minimum screen will show a particular style compared to bigger screen sizes. 

Scss or sass css was used to overwrite some bootstrap variables such as colors etc. It were also used to simplify things and allowed me to use variables inside stylesheets. Compared to plain css it is more extensive and can support big projects if the project was to be extended into a bigger scale.


### State Management
The first thing that comes to mind when it comes to state management was to use Redux. However, after some careful planning it was realized that the project only needed a simple yet effective way of storing state in order for the webapp to handle the flow of data such as arrays, booleans, and strings to be displayed on the frontend therefore, Redux was a no go. 

I came up with React Hooks which was the one that is the right fit for the job. It is a modern way to manage states in a simple manner by using functions instead of classes.It simplifies code to the point that the lines of code are shorter and cleaner. The react team also advised to use hooks for new projects just like Chatbee. You see the official hooks frequently asked questions page in [here](https://reactjs.org/docs/hooks-faq.html).
If the project was to be extended into a wider scale, The use of react context API is recommended since it can cater state management globally in a simple way.


### Code Style
The client was configured to follow the default code style that was enforced by the built-in eslint. The create-react-app checks the code whether react conventions was met or not. As the development progresses, the code is checked as you type the code and give you warnings whenever you failed to meet the code style. A good example for this is when you declare an image tag but you failed to declare an alt attribute. A warning will then show up stating that you need to add an alt attribute to fix this error and so on. As the official CRA documentation said it is not advisable to use eslint config to enforce code style and instead use Prettier which made the code cleaner and indented. (Create React App. n.d. Setting Up Your Editor | Create React App. [online] Available at: <https://create-react-app.dev/docs/setting-up-your-editor/> [Accessed 23 November 2020].)

### Database
The app needed to persist messages and users, so the main thing that comes to mind in terms of simplicity was mongodb, as it can handle data insertion and manipulation easily. Compared to relational databases, NoSql approach was done in this project since we were only inserting and retrieving data.

## Testing
### Client
The default react testing library was used in this project to test if things are working fine on the client side. The test implemented in this project was simple and minimalistic since it only checks whether pages were rendering fine. All of the data that will be shown in the client however will be validated in the server.

### Server
The servers will use jest to test specific API endpoints.It will cover basic test cases such as simulating a proper API call, simulating failed API call etc. Test cases is that it can help see the errors sooner by automating API calls, invoking functions, doing some data handling, and based on the results, you can conclude if the software is running properly or not. Tests expects some sort of results from the software, and based on that if things match, then tests will pass. However, if things are not working fine and well and return another value instead of expected value, things will be considered as fail.

## Assumptions Made
- Web Application will run in a decent server.
- Users will only send short messages.
- Users will only upload small-medium size valid avatars preferrably like size of an icon (48 x 48 pixels).
- Random avatar generated as default if the user does not want upload an avatar.
- Current active users, timestamp of when the message has been sent to track of the status of user interaction and collaboration.

## Mocked Aspects
- The username generator is a mock for a login.

## Paradigms Used

### Event-Driven
This paradigm was used since we do have socket.io and asynchronous API calls. Both Express and React uses socket.io which transmits data back and forth by listening and emitting.

### Imperative
This paradigm was used to explicitly update the state by triggering useEffect hook in react frontend. This was also evident in the backend when the API received the data and triggering a response and then updating the state of the application based on the response.

### Declarative
This paradigm was used as there was a button click function in the webapp that explicitly tells the state to change into the desired state. For example, a button click will change the state to true.

### Functional
The components were made by using functional methods (functional components). Even the backend functions were also made to help achieve results.

## Built With

[**React**](https://create-react-app.dev/) – a modern web app library used to build the frontend.
- [Bootstrap](https://www.npmjs.com/package/bootstrap) - Sleek, intuitive, and powerful front-end framework for faster and easier web development.
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [Node-sass](https://www.npmjs.com/package/node-sass) - Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass
- [Socket.io-client](https://www.npmjs.com/package/socket.io-client) – socket.io for frontend
- [React testing library](https://www.npmjs.com/package/@testing-library/react) - Simple and complete React DOM testing utilities that encourage good testing practices.
- NodeJS
- Node Package Manager

[**Express**](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
- [Body Parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
- [Cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Formidable](https://www.npmjs.com/package/formidable) - A Node.js module for parsing form data, especially file uploads.
- [Mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
- [Socket.io](https://www.npmjs.com/package/socket.io) - Socket.IO enables real-time bidirectional event-based communication.
- [Clean Jsdoc theme](https://www.npmjs.com/package/clean-jsdoc-theme) - A beautifully crafted theme/template for JSDoc 3. This theme/template looks and feels like a premium theme/template. This is a fully mobile responsive theme and also fully customizable theme
- [Jsdoc](https://www.npmjs.com/package/jsdoc) - An API documentation generator for JavaScript.
- [Jsdoc http plugin](https://www.npmjs.com/package/jsdoc-http-plugin) - This project is a fork of https://github.com/bvanderlaan/jsdoc-route-plugin Currently, bvanderlaan doesn't seems to be available to maintain the project so i'll continue here.
- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
- [Rotating file stream](https://www.npmjs.com/package/rotating-file-stream) - Opens a stream.Writable to a file rotated by interval and/or size. A logrotate alternative.
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP assertions made easy via superagent.
NodeJS, Node Package Manager

## Acknowledgment 
The idea of ChatBee was inspired by Bee Movie where bees gathered inside the beehive to chit-chat. Therefore, I thought of beehive as a "room" and the users are like the bees. 

#### Theme
[Coolors](https://coolors.co/) helped me to achieve a user-friendly theme for my web application. The name came from [Namelix](https://namelix.com/).

### Logo and image
The Bee logo used in the header of the app came from [Flaticon](https://www.flaticon.com/) in SVG format. It is scalable, transparent, easy, and fast for browsers to render them. Lastly, the image I got for the exit page came from [Undraw](https://undraw.co/search).