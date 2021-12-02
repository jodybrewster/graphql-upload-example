import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'
import compression from 'compression'
import cors from 'cors'
import schema from './schema'
import { graphqlUploadExpress } from "graphql-upload";


const app = express()

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  uploads: false,
  introspection: true, // obviously you'd hide this in production!
  playground: true,
})

app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
app.use(cors({ origin: "*" }))
app.use(compression())
server.applyMiddleware({ app, path: '/graphql' })

export default app
