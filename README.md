# santababy 🎅👶
Internal gift redemption system 

## Latest Notes
- frontend currently accepts `staff_pass_id` as a string and submits to the first endpoint `users/verify` to verify whether user is a legitimate member of the organisation. Need to take output from `user/verify` and send to `/redeemed/checkRedeemed`. If checkRedeeemed returns false, call endpoint `/redeemed/addRedeemed` on frontend and display successful redemption, else display "team has redeemed". 
- the endpoints `/users` is currently set to fetch all 5000 datapoints as  
- tried docker cli deployment on Heroku. Didn't work because heroku.yml configuration file was not defined. Build failed
- tested endpoints `users/verify`, `redeemed/checkRedeemed`, `redeemed/addRedeemed` with postman, all functional
- quite important to write seeding script so new developers don't need to docker cp and then load data into the db using psql

## Architecture and Technical Decisions
[photo]
- While this project could have been implemented with a much simpler stack(without typeORM, and maybe pass SQL queries directly), I chose TypeORM, the controller and data mapping pattern because I saw this an opportunity to learn a new stack. In hindsight, the code base design allows for expansion of API quite easily because the project has been organised into various layers - server, router, repository and models to enable customisation at any layer. For instance, if I need to change the payload type from parameters (`req.params.someField`) to reference the request's body(`req.body`), I only need to change the respective subrouter that contains the endpoint, without having to deal with business logic in the repository layer
## Setting Up:
Prerequisites: node.js, postgresql, docker, bash
A linux environment is environment is highly recommended for simplicity in onboarding, but not mandatory
```git clone git@github.com:careylzh/santababy.git```
```cd santababy```
```npm i```
```docker-compose build```
```docker-compose up```

### Seeding the database
1. Check that `santababy_db_1`, Santababy's database container, is running with `docker ps`
2. Using the containerId you saw from `docker ps`, copy the csv file into the root directory of Santababy's database container:
```docker cp [directory of data.csv* outside the container] containerId:/data.csv  ```
3. Access the shell of Santababy's database container: 
```docker exec -it santababy_db_1 bash```5
4. Access Santababy's database and perform the necessary seeding:
```
psql -U postgres #default user defined in database.ts
\c santababy #select the database
COPY "users"("staff_pass_id","team_name","created_at") FROM '/data.csv' DELIMITER ',' CSV HEADER;
```
5. go to localhost:8000/users to veri
*I renamed the given csv to data.csv for convenience

## Assumptions

- the mechanisms for retrieving `staff_pass_id` from the physical/digital credentials have been implemented.
- redemptions are only team-based. individuals can't redeem for themselves(simplifies system)
- once a teammate has redeemed on behalf of team, another teammate can't redeem for the team anymore
- members are sensible enough not to claim for other teams ><
- distribution admin team has already calculated number of gifts to issue to each team
- number of teams and number of gifts in each team are constant

## TODO/Areas of Improvement

- should probably allow administrators to add users to a team, which will change the number of gifts to be redeemed for each team
- since dataset is pretty large (5000 entries), should do auto counting of number of gifts to be redeemed and map this number of gifts to the respective teams
- standardise verify endpoint takes in payload with staffPassId instead of staff_pass_id (underscoring convention reserved for col names)
- should probably keep api and frontend repos separate for actual deployment
- use axios and frontend lib like react to simplify REST api calls. Ajax has been decreasing in popularity for good reasons
 
### TODO: Administrative

- [ ] consolidate setup docs
- [ ] write api contract for your 2 api endpoints

### TODO: Backend

- [x] setup dev env: boilerplate for backend, adding logging, danger rules for commit
- [x] add the endpoint for user (only endpoint in this project)
- [ ] add business logic to controller (2 post reqs, should use ORM also)
- [x] dockerise server
- [x] dockerise db schema
- [ ] write tests for api
- [ ] deploy on netlify/aws ec2 (if there's time)
- [] remove unnecessary typescript in docker production (if there's time)
- [x] typeORM for db query abstraction
- [ ] write script to seed data from csv upon docker-compose up? Or can just seed locally `docker cp` and `docker exec -it santababy_db_1 bash` psql?

### TODO: Frontend

- [ ] just 1 string input field. (Should probably display the member count too so they can check how many gifts they need to redeem. Requires api change.)

## Trivia/Personal Learning

- doesn't matter if built inside src or in root dir
- `build`: custom command I defined to transpile ts to js
- define `"outDir": "./build",` in `tsconfig.json`
- `ts-node` allows you to run typescript directly without having to transpile to js. Use during dev
- added nodemon config to watch ts file changes
- using morgan to log requests
- using docker and typeORM modelling to implement db schema on first setup `docker-compose build`
- linted using eslint on vsc
- the repository layer (directory) is the only way through which the server can query the database.
- data mapper pattern (coined by Fowler - Each model having their own api repo file) is probably an overkill since there are only 2 api methods
- db schema from typeORM models layer hot reloads everytime a ts file is change
- api contracts should be consistent
- req.params vs req.body
- keep data wrangling of the request in the router only. keep controller/repo layer for business logic
