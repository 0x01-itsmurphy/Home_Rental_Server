# Introduction

>Home-Rental node.js server. 
><a>Flutter Client

# Installation

This project requires the following tools:

- [Node.js](https://nodejs.org/en/) - The JavaScript environment for server-side code.
- [NPM](https://www.npmjs.com/) - A Node.js package manager used to install dependencies.


## Getting Started

**Step 1. Clone the code into a New Folder**

```
$ git clone [RepoURL]
$ cd [Repo-Folder]
```

**Step 2. Install Dependencies.**

>Install the project dependencies, listed in `package.json`.

```
$ npm install
```


**Step 3: Add environment variables and run the Server.**

>Create a new file named `.env` .
Update the MongoDB credentials. similar to this:
```
# .env file
DATABASE_URL="INSERT_DATABASE_URL"
```

**Step 4: Run the server.**

> Start the server which is as simple as:
```
$ npm start
```

The default port for our app is `8000`
Open http://localhost:8000 to view it in your browser.


## What's Included?

- [Express](https://expressjs.com/) - A minimal web framework for Node.js web 