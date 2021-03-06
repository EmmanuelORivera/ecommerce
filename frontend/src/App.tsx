import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Product from './Pages/Product';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './Utils/ScrollToTop';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Shipping from './Pages/Shipping';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className="wrapper">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={Product} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/profile" component={Profile} />
          <Route path="/cart/:id?" component={Cart} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
