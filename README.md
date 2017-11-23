# Blog App Project
Step-by-step guide to creating a basic blog app in node and express backed by postgres

## Scenario
You have been hired to complete an API for a blog app. The previous developer won the lottery or got hit by a bus, no one really knows. It's kinda a mystery and it is all anyone talks about around the office. Unfortunately Sherlock, that's not the puzzle you were hired to solve. Your challenge is to complete the blog app in time for the CEO's demo to the board next week.

### Here's what you know:
- The previous developer created a front-end GUI client using jQuery and Fetch. And started a API using Node and Express.
- The API currently uses dummy data which is just an array of objects in Javascript. and is not wired up to a database yet.
- The company uses PostgreSQL as their database. And hosts their applications on Heroku.
- Your manager says the specs for the API were documented using Postman's documenter and can be found here: [Blog App API](https://documenter.getpostman.com/view/1161985/blog-app/7EBeDoD).
- You are scheduled to have a meeting this morning at 10:00 AM Eastern to review the front-end client.
- And you have a follow-up meeting scheduled for 1:30 PM Eastern to answer any questions.
- Lastly, you found a todo list and some notes which list the tasks still needed to be completed.


### Tasks: 
- [x] Create a Skeleton Node and Express app
- [x] Create set of CRUD endpoints at `/api/v1/stories`
  - [x] Create a GET endpoint to list all stories - should return status 200 and an array of objects
  - [x] Create a GET endpoint to get a story by id - should return status 200 and an object
  - [x] Create a POST endpoint to create a story - should return status 201 with a location header and the new object
  - [x] Create a PUT endpoint to update a story - should return status 200 and the updated object
  - [x] Create a DELETE endpoint to remove a story - should return status 204 with no content

- [x] Create and wire-up database to endpoints
  - [ ] Create local Postgres database named `blog-app` (See: `createdb` on [SQL shell basics](https://courses.thinkful.com/node-sql-001v1/assignment/1.1.2) )
  > Note-to-self: If your local database doesn't work, try using ElephantSQL. But remember to put the connection string in an environment variable and use `dotenv` to prevent the UN/PW from being pushed to GitHub.
- [ ] Create a `stories` table with the following schema.
  - 3 Columns:
    - `id`: an autoincrementing integer
    - `title`: regular text. Required.
    - `content`: regular ol' text. Can be blank.

  > Note-to-self: remember to save the CREATE TABLE and INSERT INTO queries in a file so they can be easily run again later. Examples:

      psql -f ./query.sql -U <username> -d blog-app
      postgres://<USERNAME>:<PASSWORD>@<SERVER:PORT>/<DATABASE>
- [ ] Update `config.js` with DB connection info (see [node-restaurants-app-knex](https://github.com/cklanac/node-restaurants-app-knex))
- Replace **dummy data** with real database calls
  - [ ] Update GET `/api/v1/stories` endpoint to use `knex.select()...`
  - [ ] Update GET `/api/v1/stories/:id` endpoint to use `knex.select()...`
  - [ ] Update POST `/api/v1/stories/` endpoint to use `knex.insert()...`
  - [ ] Update PUT `/api/v1/stories/:id` endpoint to use `knex.update()...`
  - [ ] Update DELETE `/api/v1/stories/:id` endpoint to use `knex.del()...`
- Deploy to Heroku (see [Deploying to Heroku](https://courses.thinkful.com/node-001v5/project/1.3.5))
  - [ ] Install Heroku CLI app, if necessary
  - [ ] Create app on Heroku
  - [ ] Update git remote to point to Heroku
  - [ ] Push app to Heroku - Note: app probably won't work yet 'cause there's no production database
  - [ ] Create a production database on Elephant SQL. Use `query.sql` from earlier to easily recreate database
  - [ ] Configure Heroku config vars to use `DATABASE_URL` and the Elephant SQL connection string  


## Add Authors and Tags
The boss is very impressed with the quick turn-around. She is so impressed that she is wondering if you could **just** add `authors` and `tags` too. You think about for a bit and decide it should be relatively easy to just update the app and api. But there is a wrinkle, that sales team has already begun using the first version. After pondering your options for a bit you remember the already modular and uses express router so you decide to create a **/v2**. 

You decide to create your own punch list...

### Tasks:
- Update the Database: 
  - [ ] Create an `users` table, similar to the solution from [Challenge: blog app database](https://courses.thinkful.com/node-sql-001v1/project/1.1.6). It has the following columns.
    - 3 Columns:
      - `id`: an autoincrementing integer
      - `username`: regular text. Required.
      - `email`: regular text. Required.
  > Note: the table name. The table will contain all `users`, both generic users and blog post authors.
  - [ ] Add a `author_id` field to the stories table which references the users table.
  > Note, when we delete a story, we **do not** want to delete the associate user, so make the reference `ON DELETE RESTRICT`. Recall [Joins, related data, and constraints](https://courses.thinkful.com/node-sql-001v1/assignment/1.1.4)
  - [ ] add a few dummy users to the dev database and update the dummy stories to have authors.
  ```sql
  INSERT INTO users (email, username) VALUES
      ('foo@example.com', 'MsFoo'),
      ('bar@example.com', 'MrBar'),
      ('qux@example.com', 'DrQux');
  ```
  - [ ] Update any dummy or seed stories data to have Authors
- Update, create and mount router files: 
  - [ ] Create and mount a new "V2" router:
    - Copy the `/router/stories-router.js` router to `/router/stories-router-v2.js`
    - Rename the `/router/stories-router.js` to `/router/stories-router-v1.js`
    - Update `server.js`:
      - Fix the require statement:
      `const storiesRouter = require('./routers/stories-router');` => `const storiesRouterV1 = require('./routers/stories-router-v1');`
      - Mount the new router by adding: 
       `const storiesRouterV2 = require('./routers/stories-router-v2');`
  - Update the V2 endpoints:
    - Update `/api/v1/stories` endpoints to return or accept user information.
      - The GET endpoints will require an `.innerJoin()` on `users`
      - The POST and PUT endpoints will require some additional work:
        - First `.insert()` or `.update()` the story, then execute `.select()` with `.innerJoin()` to get the updated info. 
    - Create CRUD endpoints for the new `users` data `/api/v2/users`. They should be similar to `/api/v1/stories` above.
  
  
  - The DELETE endpoint should work as-is 
  
