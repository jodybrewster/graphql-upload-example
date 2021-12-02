import { ThemeProvider } from "styled-components"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'

import React from "react"
import ReactDOM from "react-dom"
import theme from "@rebass/preset"

import { GlobalStyle } from "./components/GlobalStyle"
import { App } from "./App"

export const link = createUploadLink({
  uri: "http://localhost:4000/graphql"
});



export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
)
