# RESTFUL API from scratch with Node.js

This project was essentially built to show my skills in **Node.js** and **Typescript**.

The project is a simple RESTUL api to register and authenticate users and is made with no 3rd party packages whatsoever. In this project you can find the following.

1. HTTP server
2. A fairly strong router that can route requests to the right controller action.
3. secure(🤷‍♂️) user authentication with JWT.

the router and JWT creation/validation was done from scratch.

The project doesn't have any kind of data validation. Data validation could be done easily but I just don't think it'll represent a proof that I know something other than the concepts already showed in the repo.

### Available Routes

- **/users**: `POST`. the following information is required. `name`, `email` and `password`
- **/login**: `POST`. the following information is required. `email` and `password`
