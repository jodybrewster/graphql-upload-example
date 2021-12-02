# GraphQL File Upload Example

This repo showcases how to build a full-stack server/client GraphQL app via Apollo, React, and TypeScript and how to upload a file via graphql mutation. I would have probably used NextJS for a final solution but I felt the need to show that I understand the fundamentals of setting up both.


# Prerequisites

Node v14
Yarn v1.22


## Setup

First, clone the repo locally and run:

```sh
$ yarn setup  # or npm run setup
```

This will install all of the necessary dependencies for the server and client portions of the app. Once that's complete, run:

```sh
$ yarn start # or npm start
```

This will

- Boot the web-app at `http://localhost:3000`
- Launch a backend server at `http://localhost:4000`
- Open up a GraphQL Playground interface at `http://localhost:4000/graphql`

## App Structure

The app is composed of two sub-apps: a [server](/server) and a [client](/client).

### [Server](/server)

The server is built with 

- [TypeScript](https://www.typescriptlang.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) 
- [Express](https://null) 
- [Graphql-Upload](https://null) 


### [Client](/client)

The client is built with...

- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Create React App](https://create-react-app.dev/).
- [TypeScript](https://www.typescriptlang.org/)
- Design System via [Rebass](https://rebassjs.org/) and [Styled System](https://styled-system.com/)
- Routing via [Reach Router](https://reach.tech/router)
- CSS-in-JS via [Styled-Components](styled-components.com)

