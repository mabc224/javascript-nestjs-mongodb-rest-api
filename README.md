# Restaurant Rest API

Rest api of restaurant using Nestjs with javascript flavour & mongoose

## Configuration

See `.env_example` file for configuration


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# tests
$ npm test
```


## API Documentation

Import open api docs into postman as collection.

```shell
  docs/restaurant-api-v0.1.yaml
```

#### Directory Structure

```shell
├── docs
|  ├── README.md
|  └── restaurant-api-v0.1.yaml
├── index.js
├── nest-cli.json
├── nodemon.json
├── package-lock.json
├── package.json
├── README.md
└── src
   ├── controllers
   |  ├── index.js
   |  ├── restaurant-menu.controller.js
   |  ├── restaurant-munu.controller.spec.js
   |  ├── restaurant.controller.js
   |  └── restaurant.controller.spec.js
   ├── filters
   |  └── exception.filter.js
   ├── gateway.module.js
   ├── main.js
   ├── middlewares
   |  ├── index.js
   |  └── logger.middleware.js
   ├── modules
   |  ├── database.module.js
   |  └── index.js
   ├── schemas
   |  ├── index.js
   |  ├── restaurant-menu.schema.js
   |  └── restaurant.schema.js
   └── services
      ├── index.js
      ├── restaurant-menu.service.js
      ├── restaurant-menu.service.spec.js
      ├── restaurant.service.js
      └── restaurant.service.spec.js
```

### Next Steps

- [ ] Add validation for input
- [ ] Add Auth guards using JWT
- [ ] Make docs downloadable
- [ ] Add tests
