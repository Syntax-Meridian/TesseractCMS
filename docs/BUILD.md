# Build Documentation

This document outlines how to run and deploy the TesseractCMS codebase, as well as the technologies used.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Layout](#project-layout)
- [Running the App](#running-the-app)
  - [Development](#development)
  - [Production](#production)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [End-to-End Tests](#end-to-end-tests)
- [Technologies Used](#technologies-used)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
   git clone [repository-url]
   cd tesseract
```

2. Install the dependencies:

```bash
    npm install
```

## Project Layout

Our codebase is structured to keep different components organized and easily accessible. Here's a quick overview of the main directories:

- **App Source Code**: [src/app/](./src/app/) - Contains the primary application code related to the frontend.
  
- **Server Source Code**: [src/server/](./src/server/) - Hosts all backend logic and server-related files.
  
- **App End-to-End Tests**: [test/app/](./test/app/) - Houses the end-to-end tests for the application to ensure everything runs as expected from the user's perspective.
  
- **Server Unit Tests**: [test/server/](./test/server/) - Contains unit tests focused on individual components of the server-side code.

Feel free to explore each directory to get a better understanding of the code structure.

## Running the App
### Development

For development purposes, run:

```bash
npm run dev
```

This will use nodemon to watch for file changes and restart the server accordingly.

### Production

Build the application:

```bash
npm run build
```

Start the server:

```bash
    npm run start
```

## Deployment
See the [deployment guide](DEPLOY.md) for information.

## Testing
### Unit Tests

Run unit tests with:

```bash
npm run test:unit
```

### End-to-End Tests

Run end-to-end tests with:

```bash
npm run test:e2e
```

## Technologies Used

- **Core Frameworks**:
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Express](https://expressjs.com/)

- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [PostCSS](https://postcss.org/)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)

- **Testing**:
  - [Playwright](https://playwright.dev/)
  - [Mocha](https://mochajs.org/)
  - [Chai](https://www.chaijs.com/)

- **TypeScript**: Used across the codebase for static typing.

- **Development Tools**:
  - [Nodemon](https://nodemon.io/): For automatically restarting the development server on file changes.
  - [ESLint](https://eslint.org/): For code linting, ensuring code quality and consistency.
