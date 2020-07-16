# limecrm

[![Build Status](https://dev.azure.com/furystack/FuryStack/_apis/build/status/gallayl.limecrm?branchName=master)](https://dev.azure.com/furystack/FuryStack/_build/latest?definitionId=7&branchName=master)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ba03c2d7-a39d-44ca-ae3f-33dd8d831ddc/deploy-status)](https://app.netlify.com/sites/silly-jennings-cc294f/deploys)

Example app with NodeJS, Express, Sequelize, React written in Typescript.

## How to use

### Prerequisites

- Node.JS (tested with LTS & Latest)
- Yarn

### Install and run

1. Clone this repository: `git clone https://github.com/gallayl/limecrm.git`
1. CD into the cloned directory: `cd limecrm`
1. Install dependencies: `yarn install`
1. Build the project: `yarn build`
1. Start with `yarn start`
1. Open the app in your browser: http://localhost:8080/

### Workspaces

- `./common` - Shared settings and model definitions between the frontend and the service
- `./service` - A simple web service
- `./frontend` - The React SPA

### Available config from env.vars

- `SERVICE_BASE_URL` - The default service URL used by the backend and the frontend. Will fall back to `http://localhost`,
- `SERVICE_PORT` - The port that the service will use for listening. Will fall back to `9090`
- `FRONTEND_URL` - The URL for the frontend app. Used by the Backend for enabling CORS.
- `IMAGES_DB` - The .sqlite file name for image metadata

### Service API endpoints

- `GET /images` - Gets the full list of uploaded images
- `POST /images` - Uploads an image. The body should be `form-data`, `file` (the image file) and `description` (text) is required
- `GET /images/:image` - Gets a single image file
