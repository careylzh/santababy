# santababy

internal gift redemption system

## Setting Up:

Prerequisites: npm, node.js, postgresql, docker (add installation resources later)

`git clone git@github.com:careylzh/santababy.git`
`cd santababy`
`npm i`
`docker-compose build`
`docker-compose up`

### Seeding the database

1. Check that `santababy_db_1` container is running with `docker ps`
2. <!--TODO: update setup later-->

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
- Should probably keep api and frontend repos separate for actual deployment

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
- [ ]

### TODO: Frontend

- [ ] just 1 string input field. (Should probably display the member count too so they can check how many gifts they need to redeem. Requires api change.)

## Trivia/Personal Learning

- doesn't matter if built inside src or in root dir
- build is a custom command defined to transpile ts to js
- define `"outDir": "./build",` in `tsconfig.json`
- `ts-node` allows you to run typescript directly without having to transpile to js. Use during dev
- can add in nodemon config to watch ts file changes
- using morgan to log requests
- using docker and typeORM modelling to implement db schema on first setup `docker-compose build`
- linted using eslint on vsc
- the repository layer (directory) is the only way through which the server can query the database.
- data mapper pattern (coined by Fowler - Each model having their own api repo file) is probably an overkill since there are only 2 api methods
- db schema from typeORM models layer hot reloads everytime a ts file is change
- api contracts should be consistent
- req.params vs req.body
- keep data wrangling of the request in the router later. keep controller/repo layer for business logic
