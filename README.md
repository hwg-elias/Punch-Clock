# Punch Clock 👊

"Punch Clock" is intended to enable the registration of the punch in and punch out of an employee. With users and companies managed be a predetermined user account, the creation of different accounts with different access types, "Punch Clock" lends itself to doing the essencial of register data and calculate the difference between "IN" and "OUT". 

---

## Technologies 

The project was made with [Typescript](https://www.typescriptlang.org) inside the framework [NestJS](https://nestjs.com) with specific folders for each part of project. The mapping of relations and requisitions to database was managed using [TypeORM](https://typeorm.io) and the said database was registered in [PostgreSQL](https://www.postgresql.org). For reasons of organization and aesthetic [Eslint](https://eslint.org) and [Prettier](https://prettier.io).

---

## Routes 

Beside the Creation route of punches, it also has the account creation route, user information update, account login and another one to certify that you are logged in to a user account. For companies it has similar routes, Create, Deactive/Reactive, Show Single Company and Show Activated Companies. Finally, the punch routes are for creating and listing the punches based on user.

The routes can be better seen in [Insomnia](https://insomnia.rest), the routes file are [here](insomnia/PUNCH-CLOCK-ROUTES.json)

---

## Dependencies
  (Could be also NPM as well)
```bash
  $ yarn add bcrypt

  $ yarn add class-transformer

  $ yarn add class-validator

  $ yarn add express
  
  $ yarn add global
  
  $ yarn add jsonwebtoken
  
  $ yarn add module-alias
  
  $ yarn add pg
  
  $ yarn add reflect-metadata
  
  $ yarn add rimraf
  
  $ yarn add rxjs
  
  $ yarn add tsconfig-paths
  
  $ yarn add typeorm
```
---

## How to start?

At first, to initialize the project you can use teminal command ```yarn start``` by default, however it does not prevent you from being able to use ```npm``` as well if configured.

The project relies on using migrations and to configure right is required to change [.env_example]() name to  .env  only and alter the informations inside to yours, then use terminal command ```yarn db:migrate``` to load all the migrations of create and alter tables in database, after that, use ```yarn db:seed``` to populate database with some datas preseteds, so it is possible to check some of funcionalities without send every single data by hands.

<h2 align='center'>Autor</h2>
<div align='center'>
  Made with ❤️ by <a href= https://github.com/hwg-elias>Gabriel Elias</a>
</div>
