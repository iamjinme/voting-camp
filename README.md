# Voting App - Basejump for FreeCodeCamp

[![Join the chat at https://gitter.im/FreeCodeCamp/FreeCodeCamp](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/FreeCodeCamp/FreeCodeCamp)

## Overview

Curiosimg is an API microService for search for images across the Internet (well, allmost), it's support on Clementine.js. This app is a challenge for Back End Certification on FreeCodeCamp.

The [Free Code Camp](http://www.freecodecamp.com) version of Clementine.js is meant for use when completing projects as part of the FCC curriculum. This version includes GitHub authentication using [Passport](http://passportjs.org/).

# Quick Start Guide

### Prerequisites

In order to use Curiosimg Microservice, you must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Google Developer API Key](https://console.developers.google.com/)
- [Google Custom Search Engine](https://developers.google.com/custom-search/)

### Installation & Startup

To install Curiosimg Microservice, simply enter the below in the terminal window:

```bash
$ git clone https://github.com/mirabalj/curiosimg.git your-project
```

To install the dependencies, enter the following in your terminal:

```
$ cd your-project
$ npm install
```

This will install the Timestamp Microservice components into the `your-project` directory.

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
PORT=8080
MONGO_URI=mongodb://localhost:27017/your-database
API_KEY=google-developer-api-key
CX_ID=custom-search-engine-id

```

### Starting the App

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!

## User Histories:

1. User Story: As an authenticated user, I can keep my polls and come back later to access them.
2. User Story: As an authenticated user, I can share my polls with my friends.
3. User Story: As an authenticated user, I can see the aggregate results of my polls.
4. User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.
5. User Story: As an authenticated user, I can create a poll with any number of possible items.
6. User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
7. User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
8. User Story: As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Usage examples

Search images for Angry Cats, very dangerous! ;)

```
/api/search/angry cats
```

Show the next 10 results for images of Pablo Escobar

```
/api/search/pablo escobar?offset=10
```

Show the latests search

```
/api/search/latest

```

## Authors

* **Jinme Mirabal** - *All the work, except Clementine.js* - [Jinme Mirabal](https://github.com/mirabalj)

## Contributing

This is an open-source project, and contributions are always welcome!

## License

MIT License. [Click here for more information.](LICENSE.md)
