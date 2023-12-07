# Form Submission
1. Implemented a nestjs api which does form submission on invocation
2. Have not deployed nestjs service to AWS, as my free tier quota is over
3. So we have to run this on the local and change the ip in main.js based on the current machine

<hr />

## Tech stack
 - Nest.js / Typescript / Javascript
 - REST APIs
 - Puppeteer

### Running the app locally

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed.
2. From the project folder, execute the following commands:

To clone the project
```shell
  git clone git@github.com:RajeshSivanesan/form-submission-puppeteer.git  
  OR
  git clone https://github.com/RajeshSivanesan/form-submission-puppeteer.git
```

Move to the directory
```shell
  cd form-submission-puppeteer
```

### To run Nest.js server
```shell
  cd api
```

To install dependencies:
```shell
  npm install
```

To run the nestjs server:
```shell
  npm start
```

### To run the form automation using docker
Go to the root folder where Dockerfile is location
```shell
  docker build -t <container_name> .
```

To run the docker container:
```shell
  Note: Please ensure IP address of machine is updated in main.js todo
  docker run pupdock
```

### Note
1) AWS deployment was not done because of free tier limit reached
2) I tried different ways of exposing localhost port to docker, but it didnt work (port mapping, host options i tried)
3) Currently the puppeteer browser is not closed, for confirming form submitted
as expected.