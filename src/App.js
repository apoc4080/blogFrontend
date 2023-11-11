import React, { useContext } from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import News from "./pages/news/News"
import Movies from "./pages/movies/Movies"
import Icons from "./pages/icons/Icons"
import Parades from "./pages/parades/Parades"
import Helpline from "./pages/helpline/Helpline"
import { Context } from "./context/Context"

const App = () => {
  //after login
  const { user } = useContext(Context)
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Regsiter} />
          <Route exact path='/post/:id' component={DetailsPages} />
          <Route exact path='/account' component={Account} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/news' component={News} />
          <Route exact path='/movies' component={Movies} />
          <Route exact path='/icons' component={Icons} />
          <Route exact path='/parades' component={Parades} />
          <Route exact path='/helpline' component={Helpline} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}
export default App
