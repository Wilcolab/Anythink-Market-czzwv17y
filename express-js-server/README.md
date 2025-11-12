# Express JS Server

This project is an Express server application that listens on port 8001. It is set up to use Nodemon for automatic code reloading during development.

## Project Structure

```
express-js-server
├── src
│   ├── index.js          # Entry point of the application
│   └── routes
│       └── tasks.js      # Routes for task management
├── package.json           # NPM configuration file
├── .nodemon.json          # Nodemon configuration file
├── Dockerfile             # Dockerfile for building the application image
├── .dockerignore          # Files and directories to ignore in Docker builds
└── README.md              # Project documentation
```

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd express-js-server
   ```

2. **Install dependencies:**
   ```
   yarn install
   ```

3. **Run the server:**
   ```
   yarn start
   ```

The server will start and listen on `http://localhost:8001`.

## Docker

To build and run the application in a Docker container, use the following commands:

1. **Build the Docker image:**
   ```
   docker build -t express-js-server .
   ```

2. **Run the Docker container:**
   ```
   docker run -p 8001:8001 express-js-server
   ```

## License

This project is licensed under the MIT License.