# santababy 🎅👶
Internal gift redemption system built using jQuery, express, typeORM, postgreSQL

## Latest Notes
- Docker is currently configured to run `npm run dev`, which is the development build (direct ts using `ts-node`). If deploying online, remember to use js `npm start` to save transpilation time, by changing `dockerfile:` in `docker-compose.yml`.
- Frontend currently accepts `staff_pass_id` as a string. Upon click submit,
    - `staff_pass_id` is submitted to the first endpoint `users/verify` to verify whether user is a legitimate member of the organisation
    - after the async function completes, the output(json string with the fields `validUser`, `teamName` and `staffPassId` are passed to `/redeemed/checkRedeemed` via the function `checkedRedeemed()`. If checkRedeemed() returns false, call `addRedeemed()` which does a post req to the endpoint `/redeemed/addRedeemed`, else display "team has redeemed". 
- the endpoints `/users` is currently set to fetch all 5000 datapoints as  
- Tested endpoints `users/verify`, `redeemed/checkRedeemed`, `redeemed/addRedeemed` with postman, all functional
- Should write seeding script so new developers don't need to `docker cp` and then load data into the db using psql
- Db only instantiated inside santababy_db_1 docker container so `npm run dev` outside the container doesn't work
- api contracts are in the respective controller files

## Architecture and Technical Decisions
(Click to zoom in thank you)
![Santababy Architecture Diagram](https://user-images.githubusercontent.com/10573919/123577030-a6372500-d805-11eb-8452-5997f57664ad.png)
- While this project could have been implemented with a much simpler code base(maybe just express and direct sql queries), I chose to isolate my api interface, routing and business logic just in case I needed to modify/extend the logic of any portion. Was also interested in using this an opportunity to pick up new skills like typeORM and design patterns. 
- In hindsight, there were clear benefits: the code base design allows for expansion of API quite easily because the project has been organised into various layers - server, router, repository and models to enable customisation at any layer. 
    - For instance, if I need to change the payload type from parameters (`req.params.someField`) to reference the request's body(`req.body`), I only need to change the respective subrouter that contains the endpoint, without having to deal with business logic in the repository layer.
- Docker was used because I didn't want to risk compromising my local environment for my current internship.

## Setting Up Locally:
- Prerequisites: node.js, postgresql, docker, bash
- A linux environment is environment is highly recommended for simplicity in onboarding, but not mandatory
```
git clone git@github.com:careylzh/santababy.git
cd santababy
npm i
npm i -d
docker-compose build
docker-compose up
```

### Seeding the database
1. Check that `santababy_db_1`, Santababy's database container, is running with `docker ps`
2. Using the containerId you saw from `docker ps`, copy the csv file into the root directory of Santababy's database container:
```docker cp [directory of data.csv* outside the container] containerId:/data.csv  ```
3. Access the shell of Santababy's database container: 
```docker exec -it santababy_db_1 bash```
4. Access Santababy's database and perform the necessary seeding:
```
psql -U postgres #default user defined in database.ts
\c santababy #select the database
COPY "users"("staff_pass_id","team_name","created_at") FROM '/data.csv' DELIMITER ',' CSV HEADER;
```
5. go to localhost:8000/users to verify that the database has been successfully seeded (you should see a huge array of json strings, each with the fields `staff_pass_id`, `team_name` and `created_at`

* *I renamed the given csv to data.csv for convenience*

## Assumptions

- the mechanisms for retrieving `staff_pass_id` from the physical/digital credentials have been implemented.
- redemptions are only team-based. individuals can't redeem for themselves(simplifies system)
- once a teammate has redeemed on behalf of team, another teammate can't redeem for the team anymore
- distribution admin team has already calculated the number of gifts to issue to each team
- number of teams and number of gifts in each team are constant

## TODO/Areas of Improvement

- should probably allow administrators to add users to a team, which will change the number of gifts to be redeemed for each team
- since dataset is pretty large (5000 entries), should do auto counting of number of gifts to be redeemed and map this number of gifts to the respective teams
- standardise verify endpoint takes in payload with staffPassId instead of staff_pass_id (underscoring convention reserved for col names)
- should probably keep api and frontend repos separate for actual deployment
- use axios and frontend lib like react to simplify REST api calls. Ajax has been decreasing in popularity for good reasons
 
### TODO: Administrative

- [x] consolidate setup docs
- [x] write api contract for your 2 api endpoints

### TODO: Backend

- [x] setup dev env: boilerplate for backend, adding logging, danger rules for commit
- [x] add the endpoint for user (only endpoint in this project)
- [x] add business logic to controller (should use ORM also)
- [x] dockerise server
- [x] typeORM for db query abstraction
- [x] dockerise db schema
- [x] spying unit tests for user controller
- [ ] unit tests for user controller using faker
- [ ] unit tests for redeemed controller
    - *should return false if individual's team has not redeemed*
    - *should return true if individual's team has redeemed*
    - *should successfully add to database with correct date in epoch format, stored as a string*
- [ ] swaggerise project?
- [ ] convert to production (so runs ts instead of js + no development packages. Edit dockerfile to point to `Dockerfile` instead of `Dockerfile.dev`) (if there's time)
- [ ] write script to seed data from csv upon docker-compose up? Or can just seed locally `docker cp` and `docker exec -it santababy_db_1 bash` psql?
- [ ] deploy on netlify/aws ec2 (if there's time)


### TODO: Frontend

- [ ] Frontend currently accepts `staff_pass_id` as a string and submits to the first endpoint `users/verify` to verify whether user is a legitimate member of the organisation. Need to take output from `user/verify` and send to `/redeemed/checkRedeemed`. If checkRedeeemed returns false, call endpoint `/redeemed/addRedeemed` on frontend and display successful redemption, else display "team has redeemed". 
- [ ] Should probably display the member count for each too so they can check how many gifts they need to redeem. Requires api change, possibly a new table?

## Trivia
- linted using eslint on vsc
- `build`: custom command I defined to transpile ts to js
- tried docker cli deployment on Heroku. Didn't work because heroku requires its own config file `heroku.yml` too, which was not defined. So build failed
- defined `"outDir": "./build",` in `tsconfig.json`

## Personal Learning
- doesn't matter if built inside src or in root dir
- `ts-node` allows you to run typescript directly without having to transpile to js. Use during dev
- added `nodemon` config to watch ts file changes (config: `npm run dev`)
    - nodemon only hot reloads ts files. If u change `.html`, `.json`, non-ts files, then you need to load them into the container again via `docker-compose build`
- using morgan to log *requests*
- using docker and typeORM modelling to implement db schema on first setup `docker-compose build`
- the repository layer (directory) is the only way through which the server can query the database.
- data mapper pattern (coined by Fowler - Each model having their own api repo file) is was first thought as an overkill to this project, since there are only 2 api methods. But clearly there were benefits to organising my api into different controllers, and not all in one huge file.
- db schema from typeORM models layer also hot reloads everytime a ts file is change
- api contracts should be consistent
- req.params vs req.body (I think passing query params to api is much easier when dealing with frontend components. Need to investigate.)
- keep data wrangling of the request in the router only. Keep controller/repo layer for business logic
- **what is the best practice for project structure in a monorepo?** `npm init` inside `src`(server for api) and `client`(eg. react on express) respectively? Need to investigate.
- how to use foreign keys to improve db design?
