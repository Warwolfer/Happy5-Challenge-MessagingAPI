# Happy5-Challenge-MessagingAPI

API service for a ​Messaging Feature​ similar to how WhatsApp works, built
with [Hapi.js](https://github.com/hapijs/hapi)

## Requirements

* Node.js (Minimum version 14)
* PostgreSQL

## Initialization

* Create a PostgreSQL database **messaging_challenge** on your machine.
* Create a user **messaging_user** with password of **messaging_password**
* Grant superuser role

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
