# BlaBlaChat

BlaBlaChat is a real-time messaging application that connects people from around the globe. Built with React, it offers a dynamic, user-friendly interface for instant communication. The application is designed with Redux for efficient state management, React Router for seamless navigation, and a suite of development tools for quality assurance.

## Prerequisites

Before proceeding, ensure you have the following installed:

-   Node.js (v20.5.0 or higher recommended)
-   Docker
-   pnpm (`npm install -g pnpm`)

## Installation

To set up the project, follow these steps:

```sh
git clone https://github.com/gaoubak/23HEC001_WEBAPP
cd blablachat
pnpm install
```

## Running the App with Docker

Docker is used to containerize BlaBlaChat, providing a consistent development and deployment environment. To start the app using Docker:

```sh
docker-compose up --build
```

This command builds the image and starts the app. The app will be running on `http://localhost:3000` and can be accessed via a web browser.

## Development

For local development, you can start the app with:

```sh
pnpm run dev
```

## Linting and Formatting

The project enforces code style and quality using ESLint and Prettier. To ensure your contributions adhere to our coding standards, run:

Linting:

```sh
pnpm run lint
```

Automatically fix linting errors:

```sh
pnpm run lint:fix
```

Formatting:

```sh
pnpm run format
```

Check if files are formatted:

```sh
pnpm run format:check
```

## Docker Environment

The provided `Dockerfile` and `docker-compose.yml` are configured to work with Node.js and pnpm. They set up the necessary environment for BlaBlaChat, expose port 3000, and mount the current directory to the container for live code updates.

## Project Structure

-   `/src` - Source code of the BlaBlaChat app.
-   `/dist` - Production build directory (excluded from linting).
-   `tsconfig.json` & `tsconfig.node.json` - Configuration for TypeScript.
