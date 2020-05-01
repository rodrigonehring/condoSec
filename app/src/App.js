import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import ThemeProvider from './ThemeProvider'
import ApolloProvider from './ApolloProvider'
import AppProvider, { useAppState } from './AppProvider'

import CreateAccountPage from './pages/CreateAccountPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AppPage from './pages/AppPage'
import BuildingPage from './pages/BuildingPage'

function Protected({ children }) {
  const { state } = useAppState()

  if (!state.userFetched) {
    return null
  }

  if (!state.user) {
    return <Redirect to="/login" />
  }

  return children
}

function App() {
  return (
    <Router>
      <AppProvider>
        <ApolloProvider>
          <ThemeProvider>
            <Switch>
              <Route exact path="/login" component={LoginPage} vaiqfunciona="né" />
              <Route exact path="/create-account" component={CreateAccountPage} />
              <Route exact path="/" component={HomePage} />

              <Route
                path="/app"
                render={() => (
                  <Protected>
                    <Switch>
                      <Route exact path="/app/building/:id" component={BuildingPage} />
                      <Route component={AppPage} />
                    </Switch>
                  </Protected>
                )}
              />
            </Switch>
          </ThemeProvider>
        </ApolloProvider>
      </AppProvider>
    </Router>
  )
}

export default App
