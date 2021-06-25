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

## Trivia, del ltr <!--TODO: del if necessary-->

- doesn't matter if built inside src or in root dir
- build is a custom command defined to transpile ts to js
- define `"outDir": "./build",` in `tsconfig.json`
- ts node allows you to run typescript directly without having to transpile to js. Use during dev
- can add in nodemon config to watch ts file changes
- using morgan to log requests

## TODO/Areas of Improvement

### TODO: Backend

- [ ] add the endpoint for user (only endpoint in this project)
- [ ] add business logic to controller (2 post reqs, should use ORM also)
- [ ] dockerise server
- [ ] dockerise db schema
- [ ] deploy on netlify/aws ec2 if there's time

### TODO: Frontend

- [ ] just 1 string input field (we assume that the mechanisms for retrieving `staff_pass_id` from the physical/digital credentials have been implemented.)
