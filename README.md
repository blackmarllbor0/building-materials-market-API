# Builder Materials Market - Online Store for Construction Materials

Welcome to the Builder Materials Market, your one-stop online shop for construction materials. This README.md file provides essential information to get you started with our application.

## Table of Contents

- [Introduction](#introduction)
- [Environment Variables](#environment-variables)
- [npm Scripts](#npm-scripts)
- [Getting Started](#getting-started)
- [Current State](#current-state)
- [Contact Us](#contact-us)

## Introduction

Builder Materials Market is an online store for construction materials. This application is designed to provide a convenient platform for customers to browse and purchase various construction supplies. Below, you will find information on setting up and running the application.

## Environment Variables

Before running the application, make sure to set up the following environment variables. These variables are essential for configuring the application properly.

```shell
SERVER_PORT=8080

DOCKER_CONTAINER_NAME=builder_materials_market
DOCKER_APP_CONTAINER_NAME=builder_materials_market_app

ORACLE_SID=bmm
ORACLE_PDB=builder_materials_market
ORACLE_PWD=pwd
ORACLE_PORT=1521
ORACLE_EDITION=enterprise
ORACLE_USER=builder_materials_market
ORACLE_CONN_STRING=localhost:1521/blackmarllbor0

TOKEN_LIVE_TIME_IN_HOURS=10
TOKEN_SECRET=auevoramjizn
```

## npm Scripts

We have included several npm scripts to help you manage the application. Here are the available scripts and their descriptions:

- `npm start`: Build the application and start the server.
- `npm run dev`: Run the application in development mode with hot-reloading.
- `npm run debug`: Run the application in debug mode.
- `npm run build`: Compile TypeScript code.
- `npm run up_db`: Start the Docker container for the database.
- `npm run migrate_up`: Run database migrations to the latest version.
- `npm run migrate_down`: Rollback the latest database migration.
- `npm run lint`: Run ESLint for code linting.
- `npm run format`: Format code using Prettier.
- `npm run gen:spec`: Generate a single OpenAPI specification file from multiple YAML files.

## Getting Started

### To get started with the Builder Materials Market application, follow these steps:

1. Clone the repository to your local machine.

`git clone https://github.com/blackmarllbor0/building-materials-market-API.git`

2. Install all dependencies.

`npm install`

3. Configure the necessary environment variables in the .env file as mentioned in the previous section.

4. If you've made changes to the OpenAPI specification in YAML files, compile them into a single file using the following command:

`npm run gen:spec`

5. If you want your user to be automatically created when building the database, and also create data to be filled in, then go to the `migrations` folder and in all `.sql` files, on the first lines, change the names of your PDB and USER_NAME.

6. Start the application:

`npm start`

### Or you can launch a docker image with a ready-made app using the command `npm run app:up`

### Your Builder Materials Market online store should now be up and running.

## Current State

Please note that the application is currently in development, and further updates and improvements will be made. Don't forget to check for updates and ensure that you have the latest dependencies installed.

Thank you for choosing Builder Materials Market for your construction material needs! If you have any questions or encounter any issues, please feel free to reach out to us.

Happy shopping!

## Contact Us

If you have any questions, suggestions, or encounter any issues, please feel free to reach out to us:

- Telegram: @blackmarllbor0
- Email: 3100194@gmail.com

Thank you for choosing Builder Materials Market for your construction material needs! Happy shopping!
