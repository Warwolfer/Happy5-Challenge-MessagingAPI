# Happy5-Challenge-MessagingAPI

![](https://img.shields.io/badge/Coverage-100%25-83A603.svg?prefix=$coverage$)

API service for a Messaging Feature similar to how WhatsApp works, built with [Hapi.js](https://github.com/hapijs/hapi)

## Requirements

* Node.js (Minimum version 14)
* PostgreSQL

## Initialization

* Create a PostgreSQL database **messaging_challenge** on your machine.
* Create a user **messaging_user** with password of **messaging_password**
* Grant superuser role to **messaging_user**. This is required to create the uuid-ossp plugin.

## How to run

* Navigate to the project root folder.
* Install dependencies with
  ```npm install```
* Run the migration with
  ```npx knex migrate:latest```
* Run the service with
  ```npm run dev```
* For default configuration the service will be hosted on http://localhost:3333. You can change this if the port is
  used.
* Access the API documentation in `/documentation`. Play around with the endpoints in the swagger page!

## How to test

* The unit test is built using mocha. Simply run ```npm run test``` to run the unit tests.
* To see the coverage, run ```npm run cover```
