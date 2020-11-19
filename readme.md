# ChatBee

ChatBee is a React web application that runs alongside with nodejs concurrently, it uses pm2 to run both of the frontend and backend as well as manage it entirely.

## Installation

Download-zip or clone: https://github.com/c1623793/web-chat-project-main.

Navigate/cd to main/root and do npm install.
Navigate/cd to backend and do npm install.
Navigate/cd to frontend and do npm install.

## Scripts

Start a terminal in the main/root folder then you can get started with commands.

### npm start (root)

Frontend and Backend are managed to run concurrently using pm2 all you have to do is go to the root directory and invoke npm start.

### npm start (backend)

Backend can run separately using this command.

### npm startDev (backend)

Backend can run separately using this command with hot reload.

### npm start (frontend)

Frontend will run on port 3001 if it did not work use fallback scripts.

### npm startLinux (frontend)

Frontend will run on port 3001 if you are using linux and the normal start did not work. Use this.

### npm startWindows (frontend)

Frontend will run on port 3001 if you are using windows and the normal start did not work. use this.

### npm run build

You can build it then use the combination of

    npm install -g serve
    serve -s build

### npm run test(frontend)

Run command to verify if things render well (make sure to run the backend while testing)

## Justification

### Create-react-app:

I used Create-React-App to get starting fast since it set things up automatically, you can worry less about setting things up and build instead. This frontend framework is very useful especially if you wanted to do many frontend logic as well as make things reactive. You can really rely on react. This framework makes your code cleaner, organized, as well as readable.

The project structure that I had adopted is just simple. However, If I will be doing a large scale web app I will prefer to use an architecture such as ducks architecture. Since this project has a small scope, I just kept it simple and avoided over engineering.

### Express,Socket.io,Axios,Formidable and Websocket:

The main thing that I like about express is that I can make an API get started within a few minutes, it will be used to persist data and will act as a bridge of communication from backend to frontend.

Socket.io will be used for real-time communication such as chatting and collaborating that is why this chat app is using socket.io.

Axios will be used to call API to POST and GET data from the backend to display in the frontend and then update things depending on the components. Axios is also much cleaner than fetch and xhr requests.

Formidable will be responsible for handling form data and pass files from both the frontend and backend. In that way it will store things in the folder and stores the directory link for the app to consume.

### Image Avatar:

Avatar will be move into a folder once it is uploaded and in there, react will access it.

### Tests:

I just did a simple validation using react testing library to see if things do render as expected. The testing library tries to simulate rendering which is good since I had seen some possible problems along the way when I tested things out.

1. The React Testing Library is a very light-weight solution for testing React components. It provides light utility functions on top of react-dom and react-dom/test-utils, in a way that encourages better testing practices. 

2. So rather than dealing with instances of rendered React components, your tests will work with actual DOM nodes. The utilities this library provides facilitate querying the DOM in the same way the user would. Finding form elements by their label text (just like a user would), finding links and buttons from their text (like a user would). It also exposes a recommended way to find elements by a data-testid as an "escape hatch" for elements where the text content and label do not make sense or is not practical. https://testing-library.com/docs/react-testing-library/intro/

### Paradigms

I made an event driven paradign of coding as well as stateful technique when I did the app. I made sure that code splitting will be efficient as well as readable. Variables are easy to understand. Socket.io is event driven and that means that socket.io can both emit and listed at the same time.

In persisting things right inside our repository, things was kind of tricky but I still made it on socket emit save to database then reload on enter, also I did use SCSS since it was kind of also importat especially we can use it in a game or w

My components do not rely on other's to have a certain state or propoerty, but instead react upon one another's state or data to influence their own properties.

Linter or the coding conventions are mandated by jsdoc which makes it easier for us to do avoid bugs on code by enforcing coding conventions.

### Styling

I used React-bootstrap  and scss to style things differently asd well as conditional rendering. Scss variables are so good to the point that you can override boostrap itself.

## License

[MIT License]
