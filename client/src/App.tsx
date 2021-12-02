import React from "react"
import { Box } from "rebass"
import { Router } from "@reach/router"

import { Home } from "./routes/Home"

export const App: React.FC = () => {
  return (
    <Box m={2} width="50%" margin="auto">

      <Box my={3}>
        <Router primary={false}>
          <Home path="/" />
        </Router>
      </Box>

    </Box>
  )
}
