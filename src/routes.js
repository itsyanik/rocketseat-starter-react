import React from 'react'
import Main from './pages/main'
import Product from './pages/product'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/products/:id' component={Product}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes