# santababy

internal gift redemption system

## Setting Up:

`git clone git@github.com:careylzh/santababy.git`
`cd santababy`
`npm i `

<!--TODO: update setup later-->

## Assumptions

- redemptions are only team-based. individuals can't redeem for themselves(simplifies system)
- once a teammate has redeemed on behalf of team, another teammate can't redeem for the team anymore
- members are sensible enough not to claim for other teams ><

## Trivia, del ltr <!--TODO: del if necessary-->

- doesn't matter if built inside src or in root dir
- build is a custom command defined to transpile ts to js
- define `"outDir": "./build",` in `tsconfig.json`
- ts node allows you to run typescript directly without having to transpile to js. Use during dev
- can add in nodemon config to watch ts file changes
- using morgan to log requests
- using docker and typeORM modelling to implement db schema on first setup `docker-compose build`
- linted using eslint on vsc

## TODO/Areas of Improvement

### TODO: Administrative

- [ ] consolidate setup docs
- [ ] write api contract for your 2 api methods

### TODO: Backend

- [x] setup dev env: boilerplate for backend, adding logging, danger rules for commit
- [x] add the endpoint for user (only endpoint in this project)
- [ ] add business logic to controller (2 post reqs, should use ORM also)
- [x] dockerise server
- [x] dockerise db schema
- [ ] write tests for api
- [ ] deploy on netlify/aws ec2 (if there's time)
- [ ] remove unnecessary typescript in docker production (if there's time)
- [ ] postgres driver pg typeORM for db query abstraction, reflect-metadata for decorator logs support
- [ ] typeORM for db query abstraction
- [ ] write script to seed data from csv? Or can just seed locally through psql
- [ ]
- [ ]

### TODO: Frontend

- [ ] just 1 string input field (we assume that the mechanisms for retrieving `staff_pass_id` from the physical/digital credentials have been implemented.)
